document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("recipe-list");

  list.addEventListener("click", getRecipe);
});

//show recipe after being selected from the side bar
function showRecipe({ target }) {
  if (target.tagName != "BUTTON") return;
  const id = target.dataset.id;
  fetch("http://localhost:3000/recipes/" + id);
}
