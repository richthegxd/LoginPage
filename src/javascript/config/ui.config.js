const UI = {
    forms: {
        formLog: document.forms["form_login"],
        formReg: document.forms["form_register"],
    },
    inputsLogin: {
        email: document.querySelector("#email"),
        password: document.querySelector("#password"),
    },
    inputsRegister: {
        email: document.querySelector("#form_register #email"),
        passwor: document.querySelector("#form_register #password"),
        nickname: document.querySelector("#nickname"),
        first_name: document.querySelector("#first_name"),
        last_name: document.querySelector("#last_name"),
        phone: document.querySelector("#phone"),
        gender: document.querySelector("#gender_orientation"),
        country: document.querySelector("#country"),
        city: document.querySelector("#city"),
        date_of_birth_day: document.querySelector("#date_of_birth_day"),
        date_of_birth_month: document.querySelector("#date_of_birth_month"),
        date_of_birth_year: document.querySelector("#date_of_birth_year"),
    },
};
export default UI;
