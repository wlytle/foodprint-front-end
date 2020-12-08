//create and append a form to create a new recipe
function createRecipe(recipe = null) {
  // set form values if the form is being generated as an edit form via editRecipe()

  const titleValue = recipe?.title || "";
  const yieldValue = recipe?.yield || "";
  const instructionsValue = recipe?.instructions || "";
  const imageValue = recipe?.image || "";
  const id = recipe?.id || "";
  let submitValue;
  let submitId;

  if (recipe) {
    submitValue = "Update Recipe";
    submitId = "update-btn";
  } else {
    submitValue = "Save Recipe";
    submitId = "submit-btn";
  }

  //Get main div to show form and clear out anything that's there
  const div = document.getElementById("main-show");
  div.innerHTML = "";
  // Create form sections
  const formDiv1 = document.createElement("div");
  const formDiv2 = document.createElement("div");
  const formDiv3 = document.createElement("div");
  const formDiv4 = document.createElement("div");
  const formDiv5 = document.createElement("div");
  const formDiv6 = document.createElement("div");

  //give form sections classes
  formDiv1.className = "form-group";
  formDiv2.className = "form-group";
  formDiv2.id = "yield-div";
  formDiv3.className = "form-group";
  formDiv3.id = "add-btn-div";
  formDiv4.className = "form-group";
  formDiv5.className = "form-group";
  formDiv6.className = "form-group form-check-inline";

  // invalid field notifications
  const titleValid = document.createElement("div");
  const yieldValid = document.createElement("div");
  const instructionsValid = document.createElement("div");

  titleValid.className = "invalid-feedback";
  yieldValid.className = "invalid-feedback";
  instructionsValid.className = "invalid-feedback";

  titleValid.textContent = "Please enter a title";
  yieldValid.textContent = "Please enter a number of servings";
  instructionsValid.textContent = "Please enter instructions";

  //create form elements
  const form = document.createElement("form");
  const titleLabel = document.createElement("label");
  const title = document.createElement("input");
  const yieldLabel = document.createElement("label");
  const yield = document.createElement("input");
  const instructionsLabel = document.createElement("label");
  const instructions = document.createElement("textarea");
  const imageLabel = document.createElement("label");
  const image = document.createElement("input");
  const addBtn = document.createElement("BUTTON");
  const publicCheck = document.createElement("input");
  const publicCheckLabel = document.createElement("label");
  const submit = document.createElement("BUTTON");

  //add attributes of form elements
  form.id = "create-recipe-form";
  form.method = "post";
  form.className = "needs-validation";
  form.setAttribute("novalidate", "");
  form.dataset.id = id;
  titleLabel.textContent = "Title";
  title.type = "text";
  title.name = "title";
  title.className = "form-control form-control-lg";
  title.required = true;
  title.value = titleValue;
  yieldLabel.textContent = "Servings";
  yield.type = "number";
  yield.name = "yield";
  yield.className = "form-control";
  yield.id = "yield-input";
  yield.required = true;
  yield.value = yieldValue;
  instructionsLabel.textContent = "Directions";
  instructions.name = "instructions";
  instructions.className = "form-control";
  instructions.required = "true";
  instructions.value = instructionsValue;
  addBtn.textContent = "Add Ingredient";
  addBtn.className = "btn btn-primary";
  addBtn.id = "add-btn";
  publicCheckLabel.textContent = "Make Public";
  imageLabel.textContent = "Image URL";
  image.name = "image";
  image.className = "form-control";
  image.value = imageValue;
  publicCheckLabel.className = "form-check-label";
  publicCheck.type = "checkbox";
  publicCheck.name = "public";
  publicCheck.className = "form-check-input";
  publicCheck.id = "check-box";
  if (recipe?.public) publicCheck.checked = true;
  submit.type = "submit";
  submit.textContent = submitValue;
  submit.className = "btn btn-primary";
  submit.id = submitId;
  submit.dataset.id = recipe?.id;

  //append form elements to appropriate secionts
  formDiv1.append(titleLabel, title, titleValid);
  formDiv2.append(yieldLabel, yield, yieldValid);
  formDiv3.append(addBtn);
  formDiv4.append(instructionsLabel, instructions, instructionsValid);
  formDiv5.append(imageLabel, image);
  formDiv6.append(publicCheckLabel, publicCheck, submit);

  //append form elements
  div.appendChild(form);

  form.append(formDiv1, formDiv2);

  // if form is for editing generate and fill int he appropriate ingredient fields
  if (recipe) {
    for (const ing of recipe.recipe_ingredients) {
      addIngredientInput(ing);
    }
  } else {
    addIngredientInput();
  }

  form.append(formDiv3, formDiv4, formDiv5, formDiv6);

  //add event listener to  handle all the things
  form.addEventListener("click", handleFormClick);
}

// create and append a new recipe input field
function addIngredientInput(ing = null) {
  // set up values for pre-filling edit form

  const ingredientValue = ing?.ingredient?.name || "";
  const quantityValue = ing?.quantity || "";
  const unitValue = ing?.unit || "";
  const typeValue = ing?.ingredient_type?.name || "";
  const displayValue = ing?.whole_line || "";
  let removeId;
  ing ? (removeId = "delete-ri-btn") : (removeId = "remove-btn");

  // create containment div
  const rowdiv1 = document.createElement("div");
  const rowdiv2 = document.createElement("div");
  const row1_coldiv1 = document.createElement("div");
  const row1_coldiv2 = document.createElement("div");
  const row1_coldiv3 = document.createElement("div");
  const row1_coldiv4 = document.createElement("div");
  const row1_coldiv5 = document.createElement("div");
  const row1_coldiv6 = document.createElement("div");

  const row2_coldiv1 = document.createElement("div");
  const row2_coldiv2 = document.createElement("div");
  const row2_coldiv3 = document.createElement("div");
  const row2_coldiv4 = document.createElement("div");
  const row2_coldiv5 = document.createElement("div");
  const row2_coldiv6 = document.createElement("div");

  //Valididty fields
  const ingValid = document.createElement("div");
  const quantityValid = document.createElement("div");
  const displayValid = document.createElement("div");

  ingValid.className = "invalid-feedback";
  quantityValid.className = "invalid-feedback";
  displayValid.className = "invalid-feedback";

  ingValid.textContent = "Please enter an ingredient";
  quantityValid.textContent = "Please enter a quantity";
  displayValid.textContent = "Please enter a display text";

  //give form section class
  rowdiv1.className = "form-row";
  rowdiv2.className = "form-row";
  row1_coldiv1.className = "form-group col";
  row1_coldiv2.className = "form-group col";
  row1_coldiv3.className = "form-group col-4";
  row1_coldiv4.className = "form-group col";
  row1_coldiv5.className = "form-group col";
  row1_coldiv6.className = "form-group col";

  row2_coldiv1.className = "form-group col";
  row2_coldiv2.className = "form-group col";
  row2_coldiv3.className = "form-group col-4";
  row2_coldiv4.className = "form-group col";
  row2_coldiv5.className = "form-group col";
  row2_coldiv6.className = "form-group col";

  //create form elements
  const form = document.getElementById("create-recipe-form");
  const ingredientLabel = document.createElement("label");
  const ingredient = document.createElement("input");
  const quantityLabel = document.createElement("label");
  const quantity = document.createElement("input");
  const unitLabel = document.createElement("label");
  const unit = document.createElement("input");
  const typeLabel = document.createElement("label");
  const type = document.createElement("input");
  const displayLabel = document.createElement("label");
  const display = document.createElement("input");
  const removeBtn = document.createElement("BUTTON");

  // create form alement attributes
  ingredientLabel.textContent = "Ingredient";
  ingredient.placeholder = "garlic";
  ingredient.name = "ingredient";
  ingredient.className = "form-control";
  ingredient.required = true;
  ingredient.value = ingredientValue;
  quantityLabel.textContent = "Quantity";
  quantity.placeholder = "3";
  quantity.name = "quantity";
  quantity.className = "form-control";
  quantity.required = true;
  quantity.value = quantityValue;
  unitLabel.textContent = "Units";
  unit.placeholder = "cloves";
  unit.name = "unit";
  unit.className = "form-control";
  unit.value = unitValue;
  typeLabel.textContent = "Type";
  type.placeholder = "produce";
  type.name = "type";
  type.className = "form-control";
  type.value = typeValue;
  displayLabel.textContent = "Display";
  display.placeholder = "3 garlic cloves minced";
  display.name = "whole_line";
  display.className = "form-control";
  display.required = true;
  display.value = displayValue;
  removeBtn.textContent = "Remove";
  removeBtn.className = "btn btn-danger";
  removeBtn.id = removeId;
  removeBtn.dataset.id = ing?.id;

  row1_coldiv1.appendChild(quantityLabel);
  row1_coldiv2.appendChild(unitLabel);
  row1_coldiv3.appendChild(ingredientLabel);
  row1_coldiv4.appendChild(typeLabel);
  //row1_coldiv5.appendChild(displayLabel);

  row2_coldiv1.append(quantity, quantityValid);
  row2_coldiv2.appendChild(unit);
  row2_coldiv3.append(ingredient, ingValid);
  row2_coldiv4.appendChild(type);
  //row2_coldiv5.append(display, displayValid);
  //dont add remove button to first ingredient
  const yield = document.getElementById("yield-div");
  if (form.lastElementChild !== yield) {
    row2_coldiv6.appendChild(removeBtn);
  }

  rowdiv1.append(
    row1_coldiv1,
    row1_coldiv2,
    row1_coldiv3,
    row1_coldiv4,
    //row1_coldiv5,
    row1_coldiv6
  );
  rowdiv2.append(
    row2_coldiv1,
    row2_coldiv2,
    row2_coldiv3,
    row2_coldiv4,
    //row2_coldiv5,
    row2_coldiv6
  );

  //append ingredient item in correct location
  const addbtn = document.getElementById("add-btn-div");

  form.lastElementChild === yield
    ? form.append(rowdiv1, rowdiv2)
    : form.insertBefore(rowdiv2, addbtn);
}

// remove an ingredient line from form
function removeIngredientInput(target) {
  //Remove input row with button, row with labels and surroundng div
  target.parentNode.parentNode.remove();
}

//send new recipe data to server and redirect to show recipe
function addNewRecipe({ currentTarget }) {
  //get all ingredients along with their associated stuff
  const recipe = getIngredientParams(currentTarget);

  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  };
  fetch("http://localhost:3000/recipes", configObj)
    .then((resp) => resp.json())
    .then((recipe) => {
      getAllRecipes();
      showRecipe(recipe);
    });
}

function getIngredientParams(currentTarget) {
  //get all ingredients along with their associated stuff
  let ingredients = [];
  //check if there are multiple ingredients
  if (currentTarget.ingredient.length) {
    for (const [i, ing] of currentTarget.ingredient.entries()) {
      ingredients[i] = {
        ingredient: ing.value.trim(),
        quantity: currentTarget.quantity[i].value.trim(),
        unit: currentTarget.unit[i].value.trim(),
        //whole_line: currentTarget.whole_line[i].value.trim(),
        ingredient_type: currentTarget.type[i].value.trim(),
      };
    }
  } else {
    ingredients[0] = {
      ingredient: currentTarget.ingredient.value.trim(),
      quantity: currentTarget.quantity.value.trim(),
      unit: currentTarget.unit.value.trim(),
      //whole_line: currentTarget.whole_line.value.trim(),
      ingredient_type: currentTarget.type.value.trim(),
    };
  }
  return (body = {
    title: currentTarget.title.value.trim(),
    yield: currentTarget.yield.value.trim(),
    instructions: currentTarget.instructions.value.trim(),
    public: currentTarget.public.checked,
    image: currentTarget.image.value.trim(),
    ingredients,
  });
}

//handle clicks on buttons on the new recipe form
function handleFormClick(e) {
  if (e.target.id !== "check-box") e.preventDefault();
  switch (e.target.id) {
    case "add-btn":
      addIngredientInput();
      break;
    case "submit-btn":
      // add validation checks
      if (e.currentTarget.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        // send new recipe to server
        addNewRecipe(e);
      }
      e.currentTarget.classList.add("was-validated");
      break;
    case "update-btn":
      // add validation checks
      if (e.currentTarget.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        // send new recipe to server
        updateRecipe(e);
      }
      e.currentTarget.classList.add("was-validated");
      break;
    case "remove-btn":
      removeIngredientInput(e.target);
      break;
    case "delete-ri-btn":
      deleteRecipeIngredient(e.target);
      break;
    default:
      return;
  }
}

//handle clicks of edit and delete buttons on show recipe page
function editOrDeleteRecipe(e) {
  e.target.id === "edit-btn" ? editRecipe(e) : deleteRecipe(e);
}

// delete a recipe
function deleteRecipe(e) {
  if (!confirm("Are you sure you want to delete this recipe?")) return;
  const id = e.currentTarget.id;
  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  fetch("http://localhost:3000/recipes/" + id, configObj)
    .then(() => {
      const div = document.getElementById("main-show");
      div.innerHTML = "";
      const button = document.querySelector(`button[data-id="${id}"]`);
      button.remove();
    })
    .catch((err) => console.log(err.message));
}

//edit a recipe
async function editRecipe(e) {
  const id = e.currentTarget.id;
  await getRecipe(e, id);
}

//send patch request to update Recipe
function updateRecipe(e) {
  const body = getIngredientParams(e.currentTarget);
  const id = e.target.dataset.id;
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  };

  fetch("http://localhost:3000/recipes/" + id, configObj)
    .then((resp) => resp.json())
    .then((recipe) => showRecipe(recipe));
}

function deleteRecipeIngredient(target) {
  if (!confirm("Are you sure you want to remove this ingredient?")) return;

  const id = target.dataset.id;
  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  fetch("http://localhost:3000/recipe_ingredients/" + id, configObj)
    .then(() => {
      removeIngredientInput(target);
    })
    .catch((err) => console.log(err.message));
}
