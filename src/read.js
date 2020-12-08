//set global object to keep track of emissions totals
const RECIPE_TOTALS = {
  ghg: 0,
  h2o: 0,
  eut: 0,
};

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("recipe-list");

  list.addEventListener("click", (e) => {
    e.target.id === "create-recipe-btn" ? createRecipe() : getRecipe(e);
  });
});

//show recipe after being selected from the side bar
function getRecipe({ target }, id = null) {
  RECIPE_TOTALS.ghg = 0;
  RECIPE_TOTALS.h2o = 0;
  RECIPE_TOTALS.eut = 0;
  if (target.tagName != "BUTTON") return;
  id = id || target.dataset.id;
  return fetch("http://localhost:3000/recipes/" + id)
    .then((resp) => resp.json())
    .then((recipe) => {
      // if call is coming from nav bar, render the rcipe if its coming from an edit button render the form
      target.id === "edit-btn" ? createRecipe(recipe) : showRecipe(recipe);
    })
    .catch((err) => console.log(err.message));
}

//Display recipe in the center
async function showRecipe(recipe) {
  const div = document.getElementById("main-show");
  const h1 = document.createElement("h1");
  const h4 = document.createElement("h4");
  const table = document.createElement("table");
  const ingredientList = document.createElement("tbody");
  const p = document.createElement("p");
  const img = document.createElement("img");
  const editBtn = document.createElement("BUTTON");
  const deleteBtn = document.createElement("BUTTON");
  const btnDiv = document.createElement("div");

  div.innerHTML = "";
  ingredientList.id = "ing-list";
  table.className = "table table-hover";
  img.className = "img-fluid rounded";
  editBtn.textContent = "Edit Recipe";
  editBtn.className = "btn btn-secondary";
  editBtn.id = "edit-btn";
  deleteBtn.textContent = "Delete Recipe";
  deleteBtn.textContent = "Delete Recipe";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.id = "delete-btn";
  btnDiv.id = recipe.id;

  btnDiv.append(editBtn, deleteBtn);
  table.appendChild(ingredientList);
  div.append(h1, h4, table, p, img, btnDiv);

  //store all ingredient promsies in an array
  const promises = [];
  for (i of recipe.recipe_ingredients) {
    promises.push(getRecipeIngredient(i.id));
  }

  //wait for all thsoe promises to finish
  await Promise.all(promises);

  //after all ingredients accessed and added to DOM dispaly totals
  h1.innerHTML = `${recipe.title} - ${RECIPE_TOTALS.ghg.toFixed(
    2
  )} kg of CO<sub>2</sub>Eq`;
  h1.id = "title";
  h4.innerHTML = `Serves ${recipe.yield} - ${(
    RECIPE_TOTALS.ghg / recipe.yield
  ).toFixed(2)} kg CO<sub>2</sub>Eq per serving`;
  h4.id = "yield";
  p.textContent = recipe.instructions;
  img.src = recipe.image;

  //listen for clicks to edit individual ingredients
  //table.addEventListener("click", getComparrisons);
  // handle click on edit or delte buttons -> cud.js
  btnDiv.addEventListener("click", editOrDeleteRecipe);
}
// Get ingredient details
function getRecipeIngredient(id) {
  return fetch("http://localhost:3000/recipe_ingredients/" + id)
    .then((resp) => resp.json())
    .then((ing) => showRecipeIngredient(ing));
  //.catch((err) => console.log(err.message));
}

// loop through all recipe ingrdients, pull out qutnity, ingredienet and emission data
// then append these to the dom if they exist
function showRecipeIngredient(ing) {
  const ingredient = ing.ingredient;
  const table = document.getElementById("ing-list");
  const tr = document.createElement("tr");
  const recipe = document.createElement("td");

  recipe.textContent = ing.whole_line;
  recipe.id = "whole-line";

  // Do we have data for this ingredient?
  if (ingredient.greenhouse_gass) {
    //calculate acutal emissions for quantity of ingredients used
    const [ghgEmission, water, eutrophication] = calculateEmissions(ing);

    //keep track of totals
    RECIPE_TOTALS.ghg += ghgEmission.total;
    RECIPE_TOTALS.h2o += water;
    RECIPE_TOTALS.eut += eutrophication;

    // add emissions data to dom
    if (ghgEmission.flag) {
      const ghg = document.createElement("td");
      ghg.colSpan = "3";
      ghg.textContent = ghgEmission.flag;
      tr.append(recipe, ghg);
    } else {
      const ghg = document.createElement("td");
      const h2o = document.createElement("td");
      const eut = document.createElement("td");

      /// testing modal
      const mod = document.createElement("BUTTON");

      mod.className = "btn btn-outline-success";
      mod.type = "button";
      mod.dataset.target = `#Modal${ing.id}`;
      mod.dataset.toggle = "modal";
      mod.textContent = "Investigate";

      let content = "";
      for (let em in ghgEmission) {
        let stage = em.replace(/(_)/gi, " ");

        stage = stage.charAt(0).toUpperCase() + stage.slice(1);
        content += `<li class="list-group-item">${stage}: ${ghgEmission[
          em
        ].toFixed(2)} kg of CO<sub>2</sub>Eq </li>`;
      }

      const modal = buildModal(ing, ghgEmission, content);

      ghg.innerHTML = ` ${ghgEmission.total.toFixed(
        2
      )} kg of CO<sub>2</sub>Eq `;
      h2o.textContent = `${water.toFixed(2)} L of water `;
      eut.innerHTML = `${eutrophication.toFixed(2)} g PO<sub>4</sub>eq`;
      tr.append(recipe, ghg, h2o, eut, mod);
    }

    //if no data, just say so
  } else {
    const declaration = document.createElement("td");
    declaration.textContent = `  No climate data available`;
    declaration.colSpan = "3";
    tr.append(recipe, declaration);
  }

  table.appendChild(tr);
}

//connvert ingredient units to kg
function calculateEmissions(
  ing,
  greenhouse = null,
  water_use = null,
  eutrophication = null
) {
  let quantity, h2o, eut;
  let total = 0;
  let ghg = {};
  greenhouse = greenhouse || ing.ingredient.greenhouse_gass;
  water_use = water_use || ing.ingredient.water_use.use;
  eutrophication =
    eutrophication || ing.ingredient.eutrophication.eutrophication;
  unit = ing.unit.downcase;
  switch (ing.unit) {
    case "oz":
    case "ounce":
    case "ouncea":
      quantity = +ing.quantity / 33.8;
      break;
    case "cup":
    case "cups":
      quantity = +ing.quantity / 4.2;
      break;
    case "tsp":
    case "teaspoon":
    case "teaspoons":
      quantity = +ing.quantity / 203;
      break;
    case "tbs":
    case "tbsp":
    case "tablespoon":
    case "tablespoons":
      quantity = +ing.quantity / 67.7;
      break;
    case "g":
    case "gram":
    case "grams":
      quantity = +ing.quantity / 1000;
      break;
    case "kg":
    case "kgs":
    case "kilogram":
    case "kilograms":
      quantity = +ing.quantity;
      break;
    case "lb":
    case "lbs":
    case "pound":
    case "pounds":
      quantity = +ing.quantity / 2.2;
      break;
    case "pinch":
    case "pinchs":
      // 1/8th tsp
      quantity = +ing.quantity / 1624;
      break;
    case "clove":
    case "cloves":
      quantity = +ing.quantity / 200;
      break;
    default:
      quantity = false;
  }
  for (const stage in greenhouse) {
    if (
      stage != "id" &&
      stage != "product" &&
      stage != "created_at" &&
      stage != "updated_at" &&
      quantity
    ) {
      total += quantity * greenhouse[stage];
      ghg[stage] = quantity * greenhouse[stage];
      h2o = quantity * +water_use;
      eut = quantity * +eutrophication;
    }
  }
  if (quantity === false) {
    ghg.flag = " Cannot convert ingredient quantity to kg";
    ghg.total = 0;
    h2o = 0;
    eut = 0;
  } else {
    ghg.total = total;
  }

  return [ghg, h2o, eut];
}

function buildModal(ing, originalGhg, content) {
  const modal = `<div class="modal fade" id="Modal${ing.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Life Cycle Emissions For ${ing.whole_line}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <ul class="list-group">${content}</ul>
              <hr>
              <ul class="list-group" id="options${ing.id}">

              </ul>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>`;

  const div = document.createElement("div");
  div.dataset.id = ing.id;
  div.innerHTML = modal;

  getComparrisons(ing, originalGhg);
  body = document.getElementById("body");
  body.appendChild(div);
  //return div;
}

//make fetch request with recipeingredient ing and make custome action to return
//ing.ingredient_typ.ingredients, then feed those through ghg calcs and make thema vaialble to choose form
function getComparrisons(ing, originalGhg) {
  //get list in modal to update
  // Bail if current ingrredient doesn't have a type

  if (ing.ingredient_type.name === "") return;

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
  fetch("http://localhost:3000/recipe_ingredient/types/" + ing.id, configObj)
    .then((resp) => resp.json())
    .then((ingredients) => {
      console.log(ingredients);
      //generate information about other ingredients of same type to show in modal
      //get modal list
      const ul = document.getElementById(`options${ing.id}`);
      //listen to it!
      ul.addEventListener("click", (e) => {
        replaceIngredient(e);
      });
      if (ingredients.length === 1) return;

      ingredients.forEach((ingredient) => {
        if (
          !ingredient.greenhouse_gass ||
          ingredient.name === ing.ingredient.name
        )
          return;
        const li = document.createElement("li");
        li.className = "list-group-item";

        const [ghg, h2o, eut] = calculateEmissions(
          ing,
          ingredient?.greenhouse_gass,
          ingredient?.water_use?.use,
          ingredient?.eutrophication?.eutrophication
        );
        //format change message
        let delta;
        let message;
        ghg.total - originalGhg.total > 0
          ? (delta = "increase")
          : (delta = "decrease");

        if (ghg.total - originalGhg.total === 0) {
          message = `${ingredient.name} will not change emmisions`;
        }
        message = `${ingredient.name} will ${delta} emmisions by ${Math.abs(
          ghg.total - originalGhg.total
        ).toFixed(2)} kg of CO<sub>2</sub>Eq`;

        //add a buton to swap out ingredients
        const btn = document.createElement("BUTTON");
        btn.id = ingredient.id;
        btn.className = "btn btn-outline-success float-right";
        btn.textContent = "Replace";

        li.innerHTML = message;
        li.appendChild(btn);
        ul.appendChild(li);
      });
    });
}

//replace ingredient with option from modal
function replaceIngredient(e, ing) {
  if (e.target.textContent !== "Replace") return;
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ new_ingredient: e.target.id }),
    credentials: "include",
    "Access-Control-Allow-Credentials": true,
  };

  const id = e.currentTarget.id.replace("options", "");

  fetch("http://localhost:3000/recipe_ingredients/" + id, configObj)
    .then((resp) => resp.json())
    .then((recipe) => {
      showRecipe(recipe);
      $(`#Modal${id}`).modal("hide");
    })
    .catch((err) => console.log(err.message));
}
