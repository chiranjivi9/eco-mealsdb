import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import { config } from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import { processFetchById } from "./utils";

// get config vars
config();

const app: Application = express();
const PORT: Number = Number(process.env.PORT) || 4040;
const jsonParser = bodyParser.json();

// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: `http://localhost:${PORT}`,
  preflightContinue: false,
};

// use cors middleware
app.use(cors(options));
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

app.post(
  "/meals/ingredients",
  jsonParser,
  async (req: Request, res: Response, next: NextFunction) => {
    // api key validation
    const apiKey = req.get("API-Key");

    if (!apiKey) {
      return res.status(400).send({
        isSuccess: false,
        status: 400,
        message: "API key is missing",
      });
    }

    if (apiKey !== process.env.API_KEY) {
      return res.status(400).send({
        isSuccess: false,
        status: 400,
        message: "Incorrect API Key",
      });
    }

    let { ingredient } = req.body;

    // basic validation
    if (!ingredient) {
      return res.status(400).send({
        isSuccess: false,
        status: 400,
        message: "Missing parameters.",
      });
    }

    if (typeof ingredient !== "string") {
      return res.status(400).send({
        isSuccess: false,
        status: 400,
        message: "Invalid type passed.",
      });
    }

    // fetch all recepies filter by ingredient
    try {
      let filterByIngredient = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!filterByIngredient.data.meals) {
        return res.status(404).send({
          isSuccess: false,
          status: 404,
          message: `No meals found ingredient ${ingredient}`,
        });
      }

      processFetchById(filterByIngredient.data.meals).then((response) => {
        if (!response.isSuccess) {
          return res.status(500).send(response);
        }

        return res.status(200).send(response);
      });
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      return res.status(500).send({ isSuccess: false, status: 500, message });
    }
  }
);

//enable pre-flight
app.options("*", cors(options));

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    isSuccess: false,
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

const server: Server = app.listen(PORT, () =>
  console.log(`Now listening on port ${PORT}`)
);
