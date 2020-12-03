document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("recipe-list");

  list.addEventListener("click", getRecipe);
});

//show recipe after being selected from the side bar
function getRecipe({ target }) {
  if (target.tagName != "BUTTON") return;
  const id = target.dataset.id;
  fetch("http://localhost:3000/recipes/" + id)
    .then((resp) => resp.json())
    .then((recipe) => showRecipe(recipe))
    .catch((err) => console.log(err));
}

//Display recipe in the center
function showRecipe(recipe) {
  const div = document.getElementById("main-show");
  div.innerHTML = "";
  const h1 = document.createElement("h1");
  const h4 = document.createElement("h4");
  const ingredientList = document.createElement("ul");
  const p = document.createElement("p");
  const img = document.createElement("img");

  h1.textContent = recipe.title;
  h4.textContent = `Serves ${recipe.yield}`;
  ingredientList.id = "ing-list";
  p.textContent = recipe.instructions;
  img.src = recipe.image;

  div.append(h1, h4, ingredientList, img);
  for (i of recipe.recipe_ingredients) {
    getRecipeIngredient(i.id);
  }
}
// Get ingredient details
function getRecipeIngredient(id) {
  fetch("http://localhost:3000/recipe_ingredients/" + id)
    .then((resp) => resp.json())
    .then((ing) => showRecipeIngredient(ing))
    .catch((err) => console.log(err.message));
}

// loop through all recipe ingrdients, pull out qutnity, ingredienet and emission data
// then append these to the dom if they exist
function showRecipeIngredient(ing) {
  const ingredient = ing.ingredient;
  const ul = document.getElementById("ing-list");
  const li = document.createElement("li");
  const recipe = document.createElement("span");

  recipe.textContent = ing.whole_line;
  recipe.id = "whole-line";
  li.appendChild(recipe);

  // Do we have data for this ingredient?
  if (ingredient.greenhouse_gass) {
    const ghg = document.createElement("span");
    const h2o = document.createElement("span");
    const eut = document.createElement("span");
    ghg.textContent = ` ${ingredient.greenhouse_gass.transport}  `;
    h2o.textContent = `${ingredient.water_use.use}  `;
    eut.textContent = `${ingredient.eutrophication.eutrophication}  `;
    li.append(ghg, h2o, eut);
    //if no data, just say so
  } else {
    const declaration = document.createElement("span");
    declaration.textContent = `No climate data available`;
    li.append(declaration);
  }
  ul.appendChild(li);
}
