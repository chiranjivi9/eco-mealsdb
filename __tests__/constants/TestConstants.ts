// Mock arguments for processFetchById()
export const MOCK_DATA: [
  { strMeal: string; strMealThumb: string; idMeal: string }
] = [
  {
    strMeal: "Katsu Chicken curry",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg",
    idMeal: "52820",
  },
];

// Expected output from processFetchById() for meal ID 52820
export const EXPECTED_OUTPUT = {
  isSuccess: true,
  output: [
    {
      id: "52820",
      name: "Katsu Chicken curry",
      tags: ["Curry", "Meat"],
      instructions:
        "Prep:15min  ›  Cook:30min  ›  Ready in:45min \r\n" +
        "\r\n" +
        "For the curry sauce: Heat oil in medium non-stick saucepan, add onion and garlic and cook until softened. Stir in carrots and cook over low heat for 10 to 12 minutes.\r\n" +
        "Add flour and curry powder; cook for 1 minute. Gradually stir in stock until combined; add honey, soy sauce and bay leaf. Slowly bring to the boil.\r\n" +
        "Turn down heat and simmer for 20 minutes or until sauce thickens but is still of pouring consistency. Stir in garam masala. Pour the curry sauce through a sieve; return to saucepan and keep on low heat until ready to serve.\r\n" +
        "For the chicken: Season both sides of chicken breasts with salt and pepper. Place flour, egg and breadcrumbs in separate bowls and arrange in a row. Coat the chicken breasts in flour, then dip them into the egg, then coat in breadcrumbs, making sure you cover both sides.\r\n" +
        "Heat oil in large frying pan over medium-high heat. Place chicken into hot oil and cook until golden brown, about 3 or 4 minutes each side. Once cooked, place on kitchen paper to absorb excess oil.\r\n" +
        "Pour curry sauce over chicken, serve with white rice and enjoy!",
      thumbUrl:
        "https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=MWzxDFRtVbc",
      ingredients: [
        {
          ingredient: "chicken breast",
          measurement: "4 pounded to 1cm thickness",
        },
        {
          ingredient: "plain flour",
          measurement: "2 tablespoons",
        },
        {
          ingredient: "egg",
          measurement: "1 beaten",
        },
        {
          ingredient: "breadcrumbs",
          measurement: "100g fine",
        },
        {
          ingredient: "vegetable oil",
          measurement: "230ml frying",
        },
        {
          ingredient: "sunflower oil",
          measurement: "2 tablespoons",
        },
        {
          ingredient: "onions",
          measurement: "2 sliced",
        },
        {
          ingredient: "garlic",
          measurement: "5 chopped cloves",
        },
        {
          ingredient: "carrot",
          measurement: "2 sliced",
        },
        {
          ingredient: "plain flour",
          measurement: "2 tablespoons",
        },
        {
          ingredient: "curry powder",
          measurement: "4 teaspoons",
        },
        {
          ingredient: "chicken stock",
          measurement: "600ml",
        },
        {
          ingredient: "honey",
          measurement: "2 teaspoons",
        },
        {
          ingredient: "soy sauce",
          measurement: "4 teaspoons",
        },
        {
          ingredient: "bay leaf",
          measurement: "1",
        },
        {
          ingredient: "garam masala",
          measurement: "1 teaspoon",
        },
      ],
    },
  ],
};
