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
  const ul = document.createElement("ul");
  const img = document.createElement("img");

  h1.textContent = recipe.title;
  h4.textContent = `yields ${recipe.yield} servings`;
  img.src = recipe.image;

  for (i of recipe.recipe_ingredients) {
    const li = document.createElement("li");
    const pRecipe = document.createElement("p");
    const pGhg = document.createElement("p");
    const pH2o = document.createElement("p");
    const pEut = document.createElement("p");

    pRecipe.textContent = `${i.whole_line}`;
    li.appendChild(pRecipe);
    ul.appendChild(li);
  }

  div.append(h1, h4, ul, img);
}
