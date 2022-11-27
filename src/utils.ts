import axios from "axios";
import { Ingredient } from "./types/Ingredients";
import { Meal } from "./types/Meals";

/* 👉️ This method extracts and returns the number from the passed string */
const extractNumFromStr = (str: string) => {
  const replaced = str.replace(/\D/g, "");
  let extractedNumber;

  if (replaced !== "") {
    extractedNumber = Number(replaced);
  }

  return extractedNumber;
};

/* 👉️ This method returns the ingredient => measurement mapping array */
const ingredientsToQuantityMap = (meal: any) => {
  let ingredientToQuantityArr: Array<Ingredient> = [];

  for (const item in meal) {
    if (
      item.startsWith("strIngredient") &&
      meal[item] !== "" &&
      meal[item] !== null
    ) {
      // extract the number from the key
      let ingredientCt = extractNumFromStr(item);

      if (ingredientCt) {
        // fetch the measurment/quantity details from extracted ingredient number
        meal[`strMeasure${ingredientCt}`];
        ingredientToQuantityArr.push({
          ingredient: meal[item],
          measurement: meal[`strMeasure${ingredientCt}`]
            ? meal[`strMeasure${ingredientCt}`]
            : "",
        });
      }
    }
  }

  return ingredientToQuantityArr;
};

/* 👉️ This method parses the response from
      the MealsDB API as per the Meal interface
*/
export const parseResponse = (response: any) => {
  let structureObject = {
    id: response.idMeal,
    name: response.strMeal,
    tags: response.strTags ? response.strTags.split(",") : [],
    instructions: response.strInstructions,
    thumbUrl: response.strMealThumb,
    youtubeUrl: response.strYoutube,
    ingredients: ingredientsToQuantityMap(response),
  };

  return structureObject;
};

export const processFetchById = async (
  filteredMeals: [{ strMeal: string; strMealThumb: string; idMeal: string }]
) => {
  // Awaiting multiple all API
  let promises = [];

  for (let i = 0; i < filteredMeals.length; i++) {
    promises.push(
      axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${filteredMeals[i].idMeal}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
    );
  }

  let output: Meal[] = [];

  let response = Promise.all(promises)
    .then((responses) => {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map((response) => {
          return response;
        })
      );
    })
    .then((data) => {
      // parse the response from fetch meal by id api
      // append to output array
      data.forEach((element) => {
        let parseApiResponse = parseResponse(element.data.meals[0]);
        output.push(parseApiResponse);
      });

      return { isSuccess: true, output };
    })
    .catch((error) => {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      return { isSuccess: false, message };
    });

  return response;
};
