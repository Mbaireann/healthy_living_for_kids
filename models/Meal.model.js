const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    food_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      require: true,
    },
    meal_category: {
      type: String,
      enum: ["BREAKFAST", "LUNCH", "DINNER", "SNACK"],
      require: true,
    },
    meal_quantity: {
      type: Number,
      require: true,
    },
    meal_date: {
      type: Date,
      require: true,
    },
    calories: {
      type: Number,
      require: true,
    },
    carbs: {
      type: Number,
      require: true,
    },
    energy_with_dietary_fibre: {
      type: Number,
      require: true,
    },
    protein: {
      type: Number,
      require: true,
    },
    starch: {
      type: Number,
      require: true,
    },
    total_fat: {
      type: Number,
      require: true,
    },
    total_sugars: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Meal = mongoose.model("meal", mealSchema);

module.exports = Meal;
