window.addEventListener("load", async (event) => {
  let food_id = window.location.pathname.replace("/meal/create/", "");
  console.log(food_id);
  const res = await fetch(`/food/all/${food_id}`);
  values = await res.json();

  console.log(values);

  Object.keys(values).forEach((v) => {
    if (document.getElementById(v) != null) {
      document.querySelector(`input[name=${v}]`).value = Math.floor(values[v]);
      document.getElementById(v).innerHTML = Math.floor(values[v]);
    }
  });

  let amount = document.getElementById("Amount");
  let food_name = document.querySelector(".food_name");
  let meal_factor = document.querySelector(".meal_factor");
  console.log(meal_factor.value);

  food_name.innerText = values.food_name;
  amount.addEventListener("keyup", (e) => {
    let amnt = e.target.value / 100;

    Object.keys(values).forEach((v) => {
      if (document.getElementById(v) != null) {
        meal_factor.value = amnt;
        document.querySelector(`input[name=${v}]`).value = Math.floor(
          values[v] * amnt
        );
        document.getElementById(v).innerHTML = Math.floor(values[v] * amnt);
      }
    });
  });

  Object.keys(values).forEach((v) => {
    if (document.getElementById(v) != null) {
      document.getElementById(v).innerHTML = values[v];
    }
  });
});
