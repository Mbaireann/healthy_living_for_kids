window.addEventListener("load", async (event) => {
  let user_id = document.getElementById("user_id").value;
  const res = await fetch(
    `/meal/${user_id}/stats/2021-04-24T05:40:59.302+00:00`
  );
  let nutrients = await res.json();

  const res2 = await fetch(
    `/meal/${user_id}/stats/meal_category/2021-04-24T05:40:59.302+00:00`
  );
  let meal_category = await res2.json();
  console.log(meal_category);

  let carbHtmlTag = document.getElementById("carbs");
  let proteinHtmlTag = document.getElementById("protein");
  let fatsHtmlTag = document.getElementById("fats");
  let caloriesHtmlTag = document.getElementById("calories");
  // let breakfastHtmlTag = document.getElementById("breakfast")
  // let lunchHtmlTag = document.getElementById("lunch")
  // let dinnerHtmlTag = document.getElementById("dinner")

  console.log(nutrients);

  carbHtmlTag.innerText = nutrients[0].total_carbs;
  proteinHtmlTag.innerText = nutrients[0].total_proteins;
  fatsHtmlTag.innerText = nutrients[0].total_fat;
  caloriesHtmlTag.innerText = nutrients[0].total_calories;

  meal_category.forEach((item) => {
    console.log(item);
    if (item.meal_category !== null) {
      document.getElementById(`${item.meal_category.toLowerCase()}`).innerText =
        item.total_calories;
    }
  });
});
