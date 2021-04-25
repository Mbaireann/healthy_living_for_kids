window.addEventListener('load',async (event)=>{

  let button = document.getElementById('submit')
  let searchText = document.getElementById('search_text'),value
  let bmr =  Math.floor(document.getElementById('bmr').value / 2)

  let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

  // button.addEventListener('click', async (event)=>{
  //     try {

  //     let res = await fetch(`https://api.edamam.com/search?q=${searchText}&app_id=94d4adad&app_key=5a26eb99923d214c615b44bad3d31d03&calories=${bmr}`,requestOptions)

  //     let recipe = await res.json()

  //     console.log(recipe)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // })

})