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

  // set element attributes
  h3.textContent = "Please sign in or";
  h4.append(guestBtn);
  form.id = "login-form";
  form.method = "post";
  form.className = "needs-validation";
  form.setAttribute("novalidate", "");
  usernameLabel.textContent = "Username:";
  username.type = "text";
  username.name = "username";
  username.className = "form-control form-control-lg";
  username.required = true;
  passwordLabel.textContent = "password:";
  password.type = "password";
  password.name = "password";
  password.className = "form-control form-control-lg";
  password.required = true;
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

  signupDiv.appendChild(signupBtn);

  form.append(
    usernameLabel,
    username,
    passwordLabel,
    password,
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
      // add validation checks
      if (e.target.parentNode.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        // log-in user
        loginUser(e);
      }
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
    username: user.username,
    password: user.password,
  };
  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  };
  fetch("http://localhost:3000/sessions", configObj)
    .then((resp) => resp.json())
    .then((user) => console.log(user));
}
