const express = require("express");
const foodController = require("../controller/food.controller");

const router = express.Router();

router.post("/create", foodController.createFood);
router.post("/batch/create", foodController.createBatchFood);
router.get("/all", foodController.findAllFood);
router.get("/all/:id", foodController.findFoodById);
router.delete("/single/:id", foodController.deleteFoodById)

router.get("/search",(req,res)=>{
  res.render("searchFood", { doc: res.locals.user });
})



module.exports = router;
