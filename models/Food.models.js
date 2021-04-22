const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  public_food_key: {
    unique:true,
    type: String,
  },
  classification: {
    type: Number,
  },
  food_name: {
    type: String,
  },
  energy_with_dietary_fibre: {
    type: Number,
  },
  calories: {
    type: Number,
  },
  moisture_water: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  nitrogen: {
    type: Number,
  },
  total_fat: {
    type: Number,
  },
  total_dietary_fibre: {
    type: Number,
  },
  alcohol: {
    type: Number,
  },
  total_sugars: {
    type: Number,
  },
  starch: {
    type: Number,
  },
  carbs: {
    type: Number,
  },
});

const Food = mongoose.model("food", foodSchema);

module.exports = Food;
