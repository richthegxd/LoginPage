import "../styles/main.sass";
import slider from "./views/slider";
import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login, register } from "./sevices/auth.service";
import { notify, removeNotify } from "./views/notification";
import { focus } from "./helpers/focus";
import "./helpers/change_form";
import preloader from "./views/preloader";


const {
    forms: { formLog, formReg },
} = UI;

// Events
slider.init();
preloader.init();

// An event on the slider buttons, toggles the slide, and freezes the time to switch the next slide.
const buttonsSlider = slider.allControls;

buttonsSlider.forEach((button) => {
    button.addEventListener("click", function () {
        slider.selectSlide(this.dataset.indexOfSlide);
        slider.stopSelectSlide();
    });
});

// Events when sending the form, checks the inputs and makes a request to the server

formLog.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit(Object.values(UI.inputsLogin), loginRequest);
});

formReg.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit(Object.values(UI.inputsRegister), registerRequest);
});

// Events for all inputs, removes error messages if there is one, and adds a class if the input has a value inside itself

Object.values(UI.inputsLogin).forEach((input) => {
    eventsInputs(input);
});

Object.values(UI.inputsRegister).forEach((input) => {
    eventsInputs(input);
});

function eventsInputs(input) {
    input.addEventListener("focus", () => {
        removeInputError(input);
    });

    input.addEventListener("blur", () => {
        focus(input, "has-value");
    });
}

// Delete notifications when you click on the closing button that is located inside the notification
document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove_alert_button")) {
        removeNotify(e.target.dataset.deleteAlertIndex);
    }
});

// Handlers
async function onSubmit(inputs, cb) {
    const isValidForm = validateInputs(inputs);

    if (!isValidForm) return;

    preloader.renderPreloader();

    cb();

    preloader.clearPreloader();
}

async function loginRequest() {
    const data = getValuesInput(UI.inputsLogin);
    try  {
        await login(data);
        notify({ message: "Login success!", className: "alert-success" });
        formLog.reset();
    } catch (error) {
        notify({ message: error, className: "alert-danger" });
    }
}

async function registerRequest() {
    const data = getValuesInput(UI.inputsRegister);
    try {
        await register(data);
        notify({ message: "Register success!", className: "alert-success" });
        formReg.reset();
    } catch (error) {
        notify({ message: error, className: "alert-danger" });
    }
}

function getValuesInput(inputs) {
    const values = Object.values(inputs);
    const data = values.reduce((acc, input) => {
        acc[input.id] = input.value;
        return acc;
    }, {});
    console.log(data)
    return data;
}

function validateInputs(inputs) {
    const isValidForm = inputs.every((input) => {
        const isValidInput = validate(input);

        if (!isValidInput) {
            showInputError(input);
        }

        return isValidInput;
    });

    return isValidForm;
}
