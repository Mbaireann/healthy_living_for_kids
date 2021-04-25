window.addEventListener("load", async (event) => {
  let date = document.getElementById("mydate");
  date.value = new Date().toISOString().substring(0, 10);
  date.addEventListener("input", async (e) => {
    console.log(e.target.value);
    let parsedDate = new Date(e.target.value).toISOString();

    let user_id = document.getElementById("user_id").value;

   await b(user_id,parsedDate)
    // const res = await fetch(`/meal/${user_id}/stats/2021-04-25T11:21:57.596Z`);
    // let nutrients = await res.json();

    // const res2 = await fetch(
    //   `/meal/${user_id}/stats/meal_category/2021-04-25T11:21:57.596Z`
    // );
    // let meal_category = await res2.json();
    // console.log("mealcat:",meal_category);
  });
  let user_id = document.getElementById("user_id").value;
  const res = await fetch(`/meal/${user_id}/stats/2021-04-25T11:21:57.596Z`);
  let nutrients = await res.json();

  const res2 = await fetch(
    `/meal/${user_id}/stats/meal_category/2021-04-25T11:21:57.596Z`
  );
  let meal_category = await res2.json();
  console.log(meal_category);

  let carbHtmlTag = document.getElementById("carbs");
  let proteinHtmlTag = document.getElementById("protein");
  let fatsHtmlTag = document.getElementById("fats");
  let caloriesHtmlTag = document.getElementById("calories");

  console.log(nutrients);

  carbHtmlTag.innerText = nutrients[0].total_carbs;
  proteinHtmlTag.innerText = nutrients[0].total_proteins;
  fatsHtmlTag.innerText = nutrients[0].total_fat;
  caloriesHtmlTag.innerText = nutrients[0].total_calories;

  meal_category.forEach((item) => {
    const { records } = item;
    console.log(item);
    if (item.meal_category !== null) {
      document.getElementById(`${item.meal_category.toLowerCase()}`).innerText =
        item.total_calories;
      records.forEach((item) => {
        document.getElementById(
          `${item.meal_category.toLowerCase()}_foods`
        ).innerText = item.food_name[0].food_name;
      });
    }
  });
});


async function b(user_id,time){
console.log(user_id,time)
  // let user_id = document.getElementById("user_id").value;
  const res = await fetch(`/meal/${user_id}/stats/${time}`);
  let nutrients = await res.json();

  const res2 = await fetch(
    `/meal/${user_id}/stats/meal_category/${time}`
  );
  let meal_category = await res2.json();
  console.log(meal_category);

  let carbHtmlTag = document.getElementById("carbs");
  let proteinHtmlTag = document.getElementById("protein");
  let fatsHtmlTag = document.getElementById("fats");
  let caloriesHtmlTag = document.getElementById("calories");

  console.log("kkk",nutrients);

  if(nutrients.length !== 0){

      carbHtmlTag.innerText = nutrients[0].total_carbs;
  proteinHtmlTag.innerText = nutrients[0].total_proteins;
  fatsHtmlTag.innerText = nutrients[0].total_fat;
  caloriesHtmlTag.innerText = nutrients[0].total_calories;

  meal_category.forEach((item) => {
    const { records } = item;
    console.log(item);
    if (item.meal_category !== null) {
      document.getElementById(`${item.meal_category.toLowerCase()}`).innerText =
        item.total_calories;
      records.forEach((item) => {
        document.getElementById(
          `${item.meal_category.toLowerCase()}_foods`
        ).innerText = item.food_name[0].food_name;
      });
    }
  });
  }



}
