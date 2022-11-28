<h1>EcoCart Meals API</h1>

## 🧱 The Stack

- **Web frameworks**: [Express.js](https://expressjs.com/). The app is hosted on [Vercel](https://vercel.com)

- Deployed URL: https://eco-mealsdb.vercel.app/

## 🛠️ Development

Clone

    $ git clone git@github.com:chiranjivi9/eco-mealsdb.git

Env vars - (Ideally would store them either on 1Password or Vercel)

    PORT=8000
    API_KEY="c8b7f468-6402-48c0-8d5f-a33d0c6c794e"

Install dependencies

    $ npm run install

Run the development server:

    $ npm run serve

Start production server

    $ npm run build
    $ npm run start

## 📄 API Documentation:

1. Filter by ingredient [GET]
   - /api/meals
     - Authorization type - API Key

- The filter by ingredient api on success returns a status code of `200` along with the `isSuccess:true` flag.

<br>

- ## Postman

  - Please find the API with examples in the collection [here](https://chiranjivi-backend-api.postman.co/workspace/EcoCart~499186ee-f3ad-49f1-b53c-f8be56b598c2/collection/5095269-f3363f14-f3df-4120-8213-7644dc8cd26e?action=share&creator=5095269).

<br>

- ## How to test API endpoints?

  - Once we have the dev server running locally, inside postman use the `/api/meals?ingredient=<ingredient_name>` endpoint and use the `API Key` as Authorization method. (The key is mentioned in the [Developement](#development) section).

  - There are examples of various scenarios for reference.

  - A successful api call should respond with a similar response.

  ```
  {
      "isSuccess": true,
      "output": [
          {
              "id": "52940",
              "name": "Brown Stew Chicken",
              "tags": [ "Stew"],
              "instructions": "Squeeze lime....",
              "thumbUrl": "https://www.themealdb.com/....",
              "youtubeUrl": "https://www.youtube.com/...",
              "ingredients": [
                  {
                      "ingredient": "Chicken",
                      "measurement": "1 whole"
                  },
                  {
                      "ingredient": "Tomato",
                      "measurement": "1 chopped"
                  },
                  ....
              ]
          },
          ....
      ]
  }
  ```
