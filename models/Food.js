const mongoose = require("mongoose");


const foodSchema = new mongoose.Schema({
  foodId:{
    type:String
  },
  foodName:{type:String},
  energyWithDietaryFibre:{
    type:String
  },
  energyWithoutDietaryFibre:{
    type:String
  },
  protein:{
    type:String
  },
  totalFat:{
    type:String
  },
  carb:{
    type:String
  }
})

const Food = mongoose.model("food", foodSchema);

module.exports = Food;