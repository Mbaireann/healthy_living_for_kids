const { isValidObjectId } = require("mongoose");
const Meal = require("../models/Meal.model");

module.exports = {
  async createMeal(req, res) {
    const {
      user_id,
      food_id,
      meal_category,
      meal_date,
      meal_quantity,
      calories,
      carbs,
      energy_with_dietary_fibre,
      protein,
      starch,
      total_fat,
      total_sugars,
    } = req.body;

    if (!isValidObjectId(user_id) && !isValidObjectId(food_id)) {
      res.status(400).json({ msg: "Bad request:check user_id and food_id" });
    }

    try {
      let meal = await Meal.create({
        user_id,
        food_id,
        meal_category,
        meal_date: new Date(meal_date),
        meal_quantity,
        calories,
        carbs,
        energy_with_dietary_fibre,
        protein,
        starch,
        total_fat,
        total_sugars,
      });

      console.log(meal);

      res.redirect("/home");
    } catch (error) {
      res.render("createMeal", {
        error: true,
        msg: "Data was not saved",
      });
      console.log(error);
    }
  },

  async getUserMealStatsByDate(req, res) {
    let { user_id, date } = req.params;

    let day = new Date(date).getDate();
    let month = new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();

    const agg = [
      {
        $addFields: {
          id: {
            $toString: "$user_id",
          },
          currentDay: {
            $dayOfMonth: "$createdAt",
          },
          currentMonth: {
            $month: "$createdAt",
          },
          currentYear: {
            $year: "$createdAt",
          },
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ["$id", user_id],
              },
              {
                $eq: ["$currentDay", day],
              },
              {
                $eq: ["$currentMonth", month],
              },
              {
                $eq: ["$currentYear", year],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$user_id",
          total_proteins: {
            $sum: "$protein",
          },
          total_carbs: {
            $sum: "$carbs",
          },
          total_fat: {
            $sum: "$fat",
          },
          total_calories: {
            $sum: "$calories",
          },
          doc: {
            $first: "$$ROOT",
          },
        },
      },
    ];

    try {
      let meals = await Meal.aggregate(agg);
      res.status(200).json(meals);
    } catch (error) {
      console.log(error);
    }
  },
  async getUserMealCategoryByDate(req, res) {
    let { user_id, meal_category, date } = req.params;

    let day = new Date(date).getDate();
    let month = new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();
    const agg = [
      {
        $addFields: {
          id: {
            $toString: "$user_id",
          },
          currentDay: {
            $dayOfMonth: "$createdAt",
          },
          currentMonth: {
            $month: "$createdAt",
          },
          currentYear: {
            $year: "$createdAt",
          },
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ["$id", user_id],
              },
              {
                $eq: ["$currentDay", day],
              },
              {
                $eq: ["$currentMonth", month],
              },
              {
                $eq: ["$currentYear", year],
              },
            ],
          },
        },
      },
      {
        from: "foods",
        localField: "food_id",
        foreignField: "_id",
        as: "food_name",
      },
      {
        $group: {
          _id: {
            user_id: "$user_id",
            mc: "$meal_category",
          },
          total_calories: {
            $sum: "$calories",
          },
          meal_category: {
            $first: "$meal_category",
          },
          records: {
            $push: "$$ROOT",
          },
        },
      },
    ];

    try {
      let meals = await Meal.aggregate(agg);
      res.status(200).json(meals);
    } catch (error) {
      console.log(error);
    }
  },
};
