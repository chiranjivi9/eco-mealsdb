"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
// get config vars
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4040;
const jsonParser = body_parser_1.default.json();
// options for cors midddleware
const options = {
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
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.get("/", (req, res, next) => {
    res.send(`<h1>Hello! Please find more details about the API in the Postman collection 
      <a 
      href="https://chiranjivi-backend-api.postman.co/workspace/
      EcoCart~499186ee-f3ad-49f1-b53c-f8be56b598c2/collection/
      5095269-f3363f14-f3df-4120-8213-7644dc8cd26e?action=share&creator=5095269">
      here.
      </a><h1>`);
});
app.get("/api/meals", jsonParser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // api key validation
    const apiKey = req.get("API-Key");
    if (!apiKey) {
        return res.status(401).send({
            isSuccess: false,
            status: 401,
            message: "API key is missing",
        });
    }
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).send({
            isSuccess: false,
            status: 401,
            message: "Incorrect API Key",
        });
    }
    let { ingredient } = req.query;
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
        let filterByIngredient = yield axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (!filterByIngredient.data.meals) {
            return res.status(404).send({
                isSuccess: false,
                status: 404,
                message: `No meals found ingredient ${ingredient}`,
            });
        }
        (0, utils_1.processFetchById)(filterByIngredient.data.meals).then((response) => {
            if (!response.isSuccess) {
                return res.status(500).send(response);
            }
            return res.status(200).send(response);
        });
    }
    catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error)
            message = error.message;
        return res.status(500).send({ isSuccess: false, status: 500, message });
    }
}));
//enable pre-flight
app.options("*", (0, cors_1.default)(options));
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        isSuccess: false,
        status: err.status || 500,
        message: err.message,
    });
};
app.use(errorHandler);
const server = app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
exports.default = app;
