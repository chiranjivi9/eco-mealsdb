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
exports.processFetchById = exports.parseResponse = void 0;
const axios_1 = __importDefault(require("axios"));
/* 👉️ This method extracts and returns the number from the passed string */
const extractNumFromStr = (str) => {
    const replaced = str.replace(/\D/g, "");
    let extractedNumber;
    if (replaced !== "") {
        extractedNumber = Number(replaced);
    }
    return extractedNumber;
};
/* 👉️ This method returns the ingredient => measurement mapping array */
const ingredientsToQuantityMap = (meal) => {
    let ingredientToQuantityArr = [];
    for (const item in meal) {
        if (item.startsWith("strIngredient") &&
            meal[item] !== "" &&
            meal[item] !== null) {
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
const parseResponse = (response) => {
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
exports.parseResponse = parseResponse;
const processFetchById = (filteredMeals) => __awaiter(void 0, void 0, void 0, function* () {
    // Awaiting multiple all API
    let promises = [];
    for (let i = 0; i < filteredMeals.length; i++) {
        promises.push(axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${filteredMeals[i].idMeal}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }));
    }
    let output = [];
    let response = Promise.all(promises)
        .then((responses) => {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map((response) => {
            return response;
        }));
    })
        .then((data) => {
        // parse the response from fetch meal by id api
        // append to output array
        data.forEach((element) => {
            let parseApiResponse = (0, exports.parseResponse)(element.data.meals[0]);
            output.push(parseApiResponse);
        });
        return { isSuccess: true, output };
    })
        .catch((error) => {
        let message = "Unknown Error";
        if (error instanceof Error)
            message = error.message;
        return { isSuccess: false, message };
    });
    return response;
});
exports.processFetchById = processFetchById;
