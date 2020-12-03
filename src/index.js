(function () {
  recipiesUrl = "http://localhost:3000/recipes";

  //fetch all recipes
  function getAllRecipes() {
    fetch(recipiesUrl)
      .then((resp) => resp.json())
      .then((recipes) => showRecipeList(recipes))
      .catch((err) => console.log(err));
  }

  // select recpies that are public and render them
  function showRecipeList(recipes) {
    const list = document.getElementById("recipe-list");
    //create lis for all public recipes
    for (const recipe of recipes) {
      if (!recipe.public) {
        return;
      }
      btn = renderRecipe(recipe);
      btn.dataset.id = recipe.id;
      list.appendChild(btn);
    }
  }

  // create an li for each recipe
  function renderRecipe(recipe) {
    const btn = document.createElement("BUTTON");

    btn.type = "button";
    btn.className = "list-group-item list-group-item-action";
    btn.textContent = recipe.title;
    return btn;
  }

  getAllRecipes();
})();
