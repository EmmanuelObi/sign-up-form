let firstnameVal = document.querySelectorAll("#firstname-val");
let firstnameInput = document.getElementById("firstname");
let lastnameVal = document.querySelectorAll("#lastname-val");
let lastnameInput = document.getElementById("lastname");
let passwordVal = document.getElementById("password-val");
let passwordInput = document.getElementById("password");
let emailInput = document.getElementById("email");
let errorContainer = document.getElementById("error");
let resultContainer = document.getElementById("result-container");

let errorMessage = "";

let entries = JSON.parse(localStorage.getItem("entries")) || [];

// All event listeners for form inputs
firstnameInput.addEventListener("focusin", () => {
  firstnameVal.forEach((item) => item.classList.remove("hidden"));
  errorContainer.textContent = "";
});

firstnameInput.addEventListener("focusout", () => {
  firstnameVal.forEach((item) => item.classList.add("hidden"));
});

lastnameInput.addEventListener("focusin", () => {
  lastnameVal.forEach((item) => item.classList.remove("hidden"));
  errorContainer.textContent = "";
});

lastnameInput.addEventListener("focusout", () => {
  lastnameVal.forEach((item) => item.classList.add("hidden"));
});

emailInput.addEventListener("focusin", () => {
  errorContainer.textContent = "";
});
passwordInput.addEventListener("focusin", () => {
  passwordVal.classList.remove("hidden");
  errorContainer.textContent = "";
});

passwordInput.addEventListener("focusout", () => {
  passwordVal.classList.add("hidden");
});

function validateInputs() {
  let firstName = firstnameInput.value;
  let lastName = lastnameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;

  if (firstName.trim().length < 3 || containsNumber(firstName)) {
    errorMessage = "First Name is invalid.";
    errorContainer.textContent = errorMessage;
    return;
  } else if (lastName.trim().length < 3 || containsNumber(lastName)) {
    errorMessage = "Last Name is invalid.";
    errorContainer.textContent = errorMessage;
    return;
  } else if (!validateEmail(email)) {
    errorMessage = "Email is invalid.";
    errorContainer.textContent = errorMessage;
    return;
  } else if (password.trim().length < 8) {
    errorMessage = "Password is invalid.";
    errorContainer.textContent = errorMessage;
    return;
  }

  saveEntry({ firstName, lastName, email, password });
  resetInputs();
}

function resetInputs() {
  firstnameInput.value = "";
  lastnameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

function saveEntry(entry) {
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
  location.reload();
}

function displayList() {
  if (entries.length > 0) {
    entries.forEach((entry, id) => {
      const entryItem = document.createElement("div");
      entryItem.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "gap-2",
        "flex-wrap"
      );
      entryItem.innerHTML = `
      <p>${id + 1}.</p>
        <p>${entry.firstName}</p>
           <p>${entry.lastName}</p>
              <p>${entry.email}</p>
                 <p>${entry.password}</p>
      `;

      resultContainer.appendChild(entryItem);
    });
  }
}

// Helper functions for validating email and presence of numbers
function containsNumber(str) {
  return str.match(/\d+/) !== null;
}

function validateEmail(email) {
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

displayList();
