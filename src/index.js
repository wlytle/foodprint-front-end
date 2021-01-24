document.addEventListener("DOMContentLoaded", () => {
  showAbout();
  getAllRecipes();
  checkLoggedIn();

  //listen for clikcs on the recipe list
  const list = document.getElementById("recipe-list");
  list.addEventListener("click", (e) => {
    handleRecipeListClick(e);
  });

  //listen for clicks in the navbar
  const nav = document.getElementById("nav-bar");
  nav.addEventListener("click", handleNavClicks);
});

function handleRecipeListClick() {
  switch (e.target.id) {
    case "create-recipe-btn":
      createRecipe();
      break;
    case "toggle-show-btn":
      showfilteredRecipes();
      break;
    default:
      getRecipe(e);
  }
}

//Check if there a user logged in
function checkLoggedIn() {
  const configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      //"X-CSRF-Token": browser.cookies.get(),
    },
    credentials: "include",
    "Access-Control-Allow-Credentials": true,
  };
  fetch("http://localhost:3000/users", configObj)
    .then((resp) => resp.json())
    .then((user) => {
      if (user) redirectAfterLogIn(user);
    })
    .catch((err) => console.log(err.message));
}

//fetch all recipes
function getAllRecipes() {
  recipiesUrl = "http://localhost:3000/recipes";
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

  showBtn = document.createElement("BUTTON");
  showBtn.type = "button";
  showBtn.id = "toggle-show-btn";
  showBtn.className = "list-group-item list-group-item-action list-highlight";
  showBtn.textContent = "Show My Recipes";
  list.append(button, showBtn);
  //create list for all public recipes
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
