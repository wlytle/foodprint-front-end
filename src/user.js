document.addEventListener("DOMContentLoaded", showLogin);

//show the initial login form
function showLogin() {
  const div = document.getElementById("main-show");

  //create elements
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const form = document.createElement("form");
  const usernameLabel = document.createElement("label");
  const username = document.createElement("input");
  const passwordLabel = document.createElement("label");
  const password = document.createElement("input");
  const loginBtn = document.createElement("BUTTON");
  const signupBtn = document.createElement("BUTTON");
  const guestBtn = document.createElement("BUTTON");
  const signupDiv = document.createElement("div");
  const invalidResponse = document.createElement("div");
  const formGroup = document.createElement("div");

  // set element attributes
  h3.textContent = "Please sign in or";
  h4.append(guestBtn);
  form.id = "login-form";
  form.method = "post";
  //form.className = "needs-validation";
  //form.setAttribute("novalidate", "");
  usernameLabel.textContent = "Username:";
  username.type = "text";
  username.name = "username";
  username.className = "form-control";
  //username.required = true;
  username.id = "user-input";
  passwordLabel.textContent = "password:";
  password.type = "password";
  password.name = "password";
  password.className = "form-control";
  //password.required = true;
  password.id = "password-input";
  loginBtn.textContent = "LOGIN";
  loginBtn.className = "btn btn-outline-success";
  loginBtn.id = "login-btn";
  signupBtn.textContent = "signup";
  signupBtn.className = "btn btn-link btn-sm";
  signupBtn.id = "signup-btn";
  signupBtn.type = "submit";
  guestBtn.textContent = "Continue as guest";
  guestBtn.className = "btn btn-link btn-sm";
  guestBtn.id = "guest-btn";
  invalidResponse.className = "invalid-feedback";
  invalidResponse.textContent = "Incorrect Username or Password";
  formGroup.className = "form-group";

  formGroup.append(usernameLabel, username);

  signupDiv.appendChild(signupBtn);

  form.append(
    formGroup,
    passwordLabel,
    password,
    invalidResponse,
    signupDiv,
    loginBtn
  );

  div.append(h3, h4, guestBtn, form);

  //add event listner
  div.addEventListener("click", handleSignupClick);
}

function handleSignupClick(e) {
  if (e.target.tagName !== "BUTTON") return;
  e.preventDefault();
  switch (e.target.id) {
    case "login-btn":
      loginUser(e);
      e.currentTarget.classList.add("was-validated");
      break;
    case "gues-btn":
      //login as guest
      break;
    case "signup-btn":
      //create new user
      break;
    default:
      return;
  }
}

//Log in the user
function loginUser({ target }) {
  const user = target.parentNode;
  const body = {
    username: user.username.value,
    password: user.password.value,
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      //"X-CSRF-Token": browser.cookies.get(),
    },
    body: JSON.stringify(body),
    credentials: "include",
    "Access-Control-Allow-Credentials": true,
  };
  fetch("http://localhost:3000/sessions", configObj)
    .then((resp) => resp.json())
    .then((session) => {
      console.log(session);
      if (session.error) {
        const username = document.getElementById("user-input");
        const password = document.getElementById("password-input");

        username.setCustomValidity("invalid");
        password.setCustomValidity("invalid");
      }

      redirectAfterLogIn();
    });
}

function redirectAfterLogIn() {
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
  fetch("http://localhost:3000/UserRecipes", configObj)
    .then((resp) => resp.json())
    .then((test) => {
      console.log(test);
    });
}
