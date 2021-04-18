const Food = require('../models/Food')

module.exports.createFood = async (req,res,next) =>{
  const {
  foodId,
  foodName,
  energyWithDietaryFibre,
  energyWithoutDietaryFibre,
  protein,
  totalFat,
  carb
} = req.body

let food = await Food.create({
  foodId,
  foodName,
  energyWithDietaryFibre,
  energyWithoutDietaryFibre,
  protein,
  totalFat,
  carb
})



    res.status(201).json({ food:food});
    next()

}

module.exports.findAllFood = async (req,res)=>{
  let foods = await Food.find();

  res.status(200).json(foods)
}