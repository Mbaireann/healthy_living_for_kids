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

  console.log(nutrients);

  function listNode(qty, food_name, calories) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    div.setAttribute("class", "d-flex flex-row justify-content-between");
    p.setAttribute("class", "fs-7");
    p2.setAttribute("class", "fs-7");
    p3.setAttribute("class", "fs-7");
    p.appendChild(document.createTextNode(`${qty}g`));
    p2.appendChild(document.createTextNode(`${food_name}`));
    p3.appendChild(document.createTextNode(`${calories} cal`));

    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(p3);
    return div;
  }

  meal_category.forEach((item) => {
    const { records } = item;

    console.log(item);
    if (item.meal_category !== null) {
      // document.getElementById(`${item.meal_category.toLowerCase()}`).innerText =
      //   item.total_calories;
      records.forEach((item) => {
        document
          .getElementById(`${item.meal_category.toLowerCase()}`)
          .appendChild(
            listNode(
              item.meal_quantity,
              item.food_name[0].food_name.substr(0, 20),
              item.calories
            )
          );
      });
    }
  });
});
