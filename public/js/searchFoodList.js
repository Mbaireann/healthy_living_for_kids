window.addEventListener("load", async (event) => {

  const options = {
    item:function(values){
      // console.log(values)

     return `<li class="list-group-item"><a class="_id text-decoration-none" href="/meal/create/${values._id}"><p class="food_name fs-7 mb-0"></p></a></li>`
    },
    valueNames: ["food_name"],
    page: 15,
    pagination: [
      {
        innerWindow: 7,
        outerWindow: 0,
        name: "pagination",
        item:
          ' <li class=" page-item mt-2"><a class="page page-link fs-7" href="#"></a></li>',
      },
    ],
  };

  let values = [
    {
      alcohol: 0,
      calories: 295.411416,
      carbs: 34.4,
      classification: 31302,
      energy_with_dietary_fibre: 1236,
      food_name: "Cardamom seed, dried, ground",
      moisture_water: 8.3,
      nitrogen: 1.72,
      protein: 10.8,
      public_food_key: "F002258",
      starch: 30,
      total_dietary_fibre: 28,
      total_fat: 6.7,
      total_sugars: 4.4,
      __v: 0,
      _id: "608088b5bec150398c74c7bb",
    },
  ];

  const res = await fetch("/food/all");
  values = await res.json();
  if (values) {
    const foodList = new List("Foods", options, values);
  }
});
