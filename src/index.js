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
    list.innerHTML = "";
    //add create recipe button
    button = document.createElement("BUTTON");
    button.type = "button";
    button.id = "create-recipe-btn";
    button.className = "list-group-item list-group-item-action list-highlight";
    button.textContent = "Add New Recipe";
    list.appendChild(button);
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

  // create an button for each recipe
  function renderRecipe(recipe) {
    const btn = document.createElement("BUTTON");

    btn.type = "button";
    btn.className = "list-group-item list-group-item-action";
    btn.textContent = recipe.title;
    return btn;
  }

  getAllRecipes();
})();
