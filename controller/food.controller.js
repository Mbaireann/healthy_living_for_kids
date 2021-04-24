const Food = require("../models/Food.model");

module.exports = {
  async createFood(req, res, next) {
    const {
      public_food_key,
      classification,
      food_name,
      energy_with_dietary_fibre,
      calories,
      moisture_water,
      protein,
      nitrogen,
      total_fat,
      total_dietary_fibre,
      alcohol,
      total_sugars,
      starch,
      carbs,
    } = req.body;

    try {
      let food = await Food.create({
        public_food_key,
        classification,
        food_name,
        energy_with_dietary_fibre,
        calories,
        moisture_water,
        protein,
        nitrogen,
        total_fat,
        total_dietary_fibre,
        alcohol,
        total_sugars,
        starch,
        carbs,
      });
      res.status(201).json({ food: food });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Could not save record" });
    }
  },
  async createBatchFood(req, res, next) {
    try {
      let food = await Food.insertMany(req.body);
      res.status(201).json({ food: food });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Could not save record" });
    }
  },

  async findAllFood(req, res) {
    let foods = await Food.find();

    res.status(200).json(foods);
  },

  async findFoodById(req, res) {
    let { id } = req.params;
    let food = await Food.findById(id);
    res.status(200).json(food);
  },

  async deleteFoodById(req, res) {
    let { id } = req.params;
    console.log(id);

    try {
      let found = await Food.findById(id);

      if (!found) {
        res.status(404).send({ msg: "Device doesn't exist" });
      }

      await Food.findOneAndDelete(id);
      res.status(200).json({ msg: "Record deleted" });
    } catch (e) {
      console.log(e);
    }
  },
};
