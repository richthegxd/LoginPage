const loginForm = document.querySelector("#form_login");
const registerForm = document.querySelector("#form_register");
const openRegisterFormButton = document.querySelector(".open-register");
const openLoginFormButton = document.querySelector(".open-login");

function open(openForm, closeForm) {
    openForm.classList.toggle("d-block");
    openForm.classList.toggle("d-none");

    closeForm.classList.toggle("d-none");
    closeForm.classList.toggle("d-block");
}

openRegisterFormButton.addEventListener("click", () => {
    open(registerForm, loginForm);
});

openLoginFormButton.addEventListener("click", () => {
    open(loginForm, registerForm);
});
