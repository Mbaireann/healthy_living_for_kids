const xlsxFile = require("read-excel-file/node");
const convertToJson = require("read-excel-file/schema")
const fs = require("fs")

// xlsxFile("FDB.xlsx", { getSheets: true }).then((sheets) => {
//   console.log(sheets);
//   sheets.forEach((obj) => {
//     console.log(obj);

//     console.log(obj.name);
//   });
// });

let b = [];

let docSchema = {
  "Public Food Key": {
    prop: "public_food_key",
    type: String,
  },
  Classification: {
    prop: "classification",
    type: String,
  },
  "Food Name": {
    prop: "food_name",
    type: String,
  },
  "Energy with dietary fibre": {
    prop: "energy_with_dietary_fibre",
    type: Number,
  },
  Calories: {
    prop: "calories",
    type: Number,
  },
  "Moisture water": {
    prop: "moisture_water",
    type: Number,
  },
  Protein: {
    prop: "protein",
    type: Number,
  },
  Nitrogen: {
    prop: "nitrogen",
    type: Number,
  },
  "Total Fat": {
    prop: "total_fat",
    type: Number,
  },
  "Total dietary fibre": {
    prop: "total_dietary_fibre",
    type: Number,
  },

  Alcohol: {
    prop: "alcohol",
    type: Number,
  },
  "Total sugars": {
    prop: "total_sugars",
    type: Number,
  },

  Starch: {
    prop: "starch",
    type: Number,
  },

  Carbs: {
    prop: "carbs",
    type: Number,
  },
};

// xlsxFile("FDB.xlsx").then((rows) => {
//   let rvalue = rows[0];

//   rvalue.forEach((item) => {
//     console.log(item);
//     if (typeof item === "string") {
//       console.log(item.split(" ").join("_").toLowerCase());
//     }
//     // b.push(item.replace(/\s/g, '-'))
//   });
//   // console.log(rows[0])
// });


xlsxFile("FDB.xlsx", { docSchema }).then((bb) => {
  // `errors` have shape `{ row, column, error, value }`.
// console.log(errors)


const {rows} = convertToJson(bb, docSchema)
let data = JSON.stringify(rows)
fs.writeFileSync('data.json',data)
// console.log(rows)



})

