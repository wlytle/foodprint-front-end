//create and append a form to create a new recipe
function createRecipe({ target }) {
  //Get man div to show form
  const div = document.getElementById("main-show");
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
  formDiv3.className = "form-group";
  formDiv4.className = "form-group";
  formDiv5.className = "form-group";
  formDiv6.className = "form-group form-check-inline";

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
  titleLabel.textContent = "Title";
  title.type = "text";
  title.name = "title";
  title.className = "form-control form-control-lg";
  yieldLabel.textContent = "Yield";
  yield.type = "number";
  yield.name = "yield";
  yield.className = "form-control";
  instructionsLabel.textContent = "Directions";
  instructions.name = "instructions";
  instructions.className = "form-control";
  addBtn.textContent = "Add Ingredient";
  addBtn.className = "btn btn-primary";
  publicCheckLabel.textContent = "Make Public";
  publicCheckLabel.className = "form-check-label";
  imageLabel.textContent = "Image URL";
  image.name = "image";
  image.className = "form-control";
  publicCheck.type = "checkbox";
  publicCheck.name = "public";
  publicCheck.className = "form-check-input";
  submit.type = "submit";
  submit.textContent = "Add Recipe";
  submit.className = "btn btn-primary";

  //append form elements to appropriate secionts
  formDiv1.append(titleLabel, title);
  formDiv2.append(yieldLabel, yield);
  formDiv3.append(addBtn);
  formDiv4.append(instructionsLabel, instructions);
  formDiv5.append(imageLabel, image);
  formDiv6.append(publicCheckLabel, publicCheck, submit);

  //append form elements
  div.appendChild(form);

  form.append(formDiv1, formDiv2);
  addIngredientInput();
  form.append(formDiv3, formDiv4, formDiv5, formDiv6);
}

// create and append a new recipe input field
function addIngredientInput() {
  // create containment div
  const rowdiv1 = document.createElement("div");
  const rowdiv2 = document.createElement("div");
  const row1_coldiv1 = document.createElement("div");
  const row1_coldiv2 = document.createElement("div");
  const row1_coldiv3 = document.createElement("div");
  const row1_coldiv4 = document.createElement("div");
  const row1_coldiv5 = document.createElement("div");

  const row2_coldiv1 = document.createElement("div");
  const row2_coldiv2 = document.createElement("div");
  const row2_coldiv3 = document.createElement("div");
  const row2_coldiv4 = document.createElement("div");
  const row2_coldiv5 = document.createElement("div");

  //give form section class
  rowdiv1.className = "form-row";
  rowdiv2.className = "form-row";
  row1_coldiv1.className = "form-group col";
  row1_coldiv2.className = "form-group col";
  row1_coldiv3.className = "form-group col";
  row1_coldiv4.className = "form-group col-4";
  row1_coldiv5.className = "form-group col";

  row2_coldiv1.className = "form-group col";
  row2_coldiv2.className = "form-group col";
  row2_coldiv3.className = "form-group col";
  row2_coldiv4.className = "form-group col-4";
  row2_coldiv5.className = "form-group col";

  //create form elements
  const form = document.getElementById("create-recipe-form");
  const ingredientLabel = document.createElement("label");
  const ingredient = document.createElement("input");
  const quantityLabel = document.createElement("label");
  const quantity = document.createElement("input");
  const unitLabel = document.createElement("label");
  const unit = document.createElement("input");
  const displayLabel = document.createElement("label");
  const display = document.createElement("input");
  const removeBtn = document.createElement("BUTTON");

  // create form alement attributes
  ingredientLabel.textContent = "Ingredient";
  ingredient.placeholder = "garlic";
  ingredient.name = "ingredient";
  ingredient.className = "form-control";
  quantityLabel.textContent = "Quantity";
  quantity.placeholder = "3";
  quantity.name = "quantity";
  quantity.className = "form-control";
  unitLabel.textContent = "Units";
  unit.placeholder = "cloves";
  unit.name = "units";
  unit.className = "form-control";
  displayLabel.textContent = "Display";
  display.placeholder = "3 garlic cloves minced";
  display.name = "whole_line";
  display.className = "form-control";
  removeBtn.textContent = "Remove";
  removeBtn.className = "btn btn-danger";

  row1_coldiv1.appendChild(ingredientLabel);
  row1_coldiv2.appendChild(quantityLabel);
  row1_coldiv3.appendChild(unitLabel);
  row1_coldiv4.appendChild(displayLabel);

  row2_coldiv1.appendChild(ingredient);
  row2_coldiv2.appendChild(quantity);
  row2_coldiv3.appendChild(unit);
  row2_coldiv4.appendChild(display);
  row2_coldiv5.appendChild(removeBtn);

  rowdiv1.append(
    row1_coldiv1,
    row1_coldiv2,
    row1_coldiv3,
    row1_coldiv4,
    row1_coldiv5
  );
  rowdiv2.append(
    row2_coldiv1,
    row2_coldiv2,
    row2_coldiv3,
    row2_coldiv4,
    row2_coldiv5
  );

  form.append(rowdiv1, rowdiv2);
}
