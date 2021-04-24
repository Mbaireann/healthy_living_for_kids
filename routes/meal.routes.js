const express = require("express");
const router = express.Router();

const mealController = require("../controller/meal.controller");

router.get("/create/:id", (req, res) => {
  let {id} = req.params;
  let {user} = res.locals

  res.render("createMeal", { id: id,user_id:user._id  });
});
router.post("/create", mealController.createMeal);


router.get("/:user_id/stats/:date", mealController.getUserMealStatsByDate)
router.get("/:user_id/stats/meal_category/:date", mealController.getUserMealCategoryByDate)

module.exports = router;
