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

  //listen for clicks to edit individual ingredients
  table.addEventListener("click", editRecipeIngredient);
  // handle click on edit or delte buttons -> cud.js
  btnDiv.addEventListener("click", editOrDeleteRecipe);

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
}
// Get ingredient details
function getRecipeIngredient(id) {
  return fetch("http://localhost:3000/recipe_ingredients/" + id)
    .then((resp) => resp.json())
    .then((ing) => showRecipeIngredient(ing))
    .catch((err) => console.log(err.message));
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
      const popover = document.createElement("BUTTON");

      popover.className = "btn btn-primary";
      popover.type = "button";
      popover.dataset.target = "#exampleModal";
      popover.dataset.toggle = "modal";
      popover.textContent = "modal test";

      let content = "";
      for (const em in ghgEmission) {
        content += `${em}: ${ghgEmission[em].toFixed(2)} kg of CO<sub>2</sub>Eq 
        `;
      }

      const modal = buildModal(
        `Life Cycle Emissions For ${ingredient.name}`,
        content
      );
      ////

      ghg.innerHTML = ` ${ghgEmission.total.toFixed(
        2
      )} kg of CO<sub>2</sub>Eq `;
      h2o.textContent = `${water.toFixed(2)} L of water `;
      eut.innerHTML = `${eutrophication.toFixed(2)} g PO<sub>4</sub>eq`;
      popover.appendChild(ghg);
      tr.append(recipe, ghg, h2o, eut, popover, modal);
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
function calculateEmissions(ing) {
  let quantity, h2o, eut;
  let total = 0;
  let ghg = {};
  let greenhouse = ing.ingredient.greenhouse_gass;
  let water_use = ing.ingredient.water_use.use;
  let eutrophication = ing.ingredient.eutrophication.eutrophication;
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

////////////
////////////////
///////////////
// come back to this!
function editRecipeIngredient(e) {
  console.log(e.target);
  //e.target.popover();
}

function buildModal(title, content) {
  const modal = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <p>${content}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
  const div = document.createElement("div");
  div.innerHTML = modal;
  return div;
}
