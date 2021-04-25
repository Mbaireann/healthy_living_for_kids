const express = require("express");
const router = express.Router();
const axios = require("axios");

const mealController = require("../controller/meal.controller");

router.get("/create/:id", (req, res) => {
  let { id } = req.params;
  let { user } = res.locals;

  res.render("createMeal", {doc: res.locals.user ,id: id, user_id: user._id });
});
router.post("/create", mealController.createMeal);

router.get("/:user_id/stats/:date", mealController.getUserMealStatsByDate);
router.get(
  "/:user_id/stats/meal_category/:date",
  mealController.getUserMealCategoryByDate
);
router.get("/category", (req, res) => {
  res.render("mealCategory", { doc: res.locals.user });
});

router.get("/recipe", (req, res) => {
  res.render("searchRecipe", { doc: res.locals.user });
});

router.post("/recipe", async (req, res) => {
  let { search_text } = req.body;
  var config = {
    method: "get",
    url: `https://api.edamam.com/search?app_id=94d4adad&app_key=5a26eb99923d214c615b44bad3d31d03&calories=700&q=${search_text}`,
    headers: {},
  };

  try {
    let resp = await axios(config);
    res.render("searchRecipe", { doc: res.locals.user, data: resp.data.hits });
  } catch (error) {
    console.log(error);
  }
});

router.get("/recipe/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  var config = {
    method: "get",
    url: `https://api.edamam.com/search?app_id=94d4adad&app_key=5a26eb99923d214c615b44bad3d31d03&r=http://www.edamam.com/ontologies/edamam.owl%23${id}`,
    headers: {},
  };

  try {
    let resp = await axios(config);

    console.log(resp.data);

    res.render("recipeview", { doc: res.locals.user, data: resp.data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
