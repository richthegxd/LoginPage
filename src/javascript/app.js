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
import { getValuesInput } from "./store/inputs";
import "./plugins/phone/phone_mask";
import locations from "./store/locations";
import instanceAutocomplete from "./plugins/autocomplete/index";
import checkLength from "./helpers/input_number";

document.addEventListener("DOMContentLoaded", async () => {
    // Events
    slider.init();
    preloader.init();

    // Events when sending the form, checks the inputs and makes a request to the server
    const {
        forms: { formLog, formReg },
    } = UI;

    formLog.addEventListener("submit", (e) => {
        e.preventDefault();
        onSubmit(Object.values(UI.inputsLogin), loginRequest);
    });

    formReg.addEventListener("submit", (e) => {
        e.preventDefault();
        onSubmit(Object.values(UI.inputsRegister), registerRequest);
    });

    // An event on the slider buttons, toggles the slide, and freezes the time to switch the next slide.
    const buttonsSlider = slider.allControls;

    buttonsSlider.forEach((button) => {
        button.addEventListener("click", function () {
            slider.selectSlide(this.dataset.indexOfSlide);
            slider.stopSelectSlide();
        });
    });

    // Delete notifications when you click on the closing button that is located inside the notification
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove_alert_button")) {
            removeNotify(e.target.dataset.deleteAlertIndex);
        }
    });

    // Events for all inputs, removes error messages if there is one, and adds a class if the input has a value inside itself

    Object.values(UI.inputsLogin).forEach((input) => {
        eventsInputs(input);
    });

    Object.values(UI.inputsRegister).forEach((input) => {
        eventsInputs(input);
    });

    await initCountries();
    const cities = instanceAutocomplete("#city", []);
    UI.inputsRegister.country.addEventListener("selection", async (event) => {
        if (event.detail.selection.value !== "") {
            const res = await getCities(event.detail.selection.value);
            cities.data.src = res;
        }
    });
});

// Function of initialization of all countries for input
async function initCountries() {
    await locations.init();
    instanceAutocomplete("#country", locations.countriesList);
}

async function getCities(country) {
    await locations.getCountryCodeByName(country);
    const citiesList = locations.cities;
    return citiesList;
}

function eventsInputs(input) {
    input.addEventListener("focus", () => {
        removeInputError(input);
    });

    input.addEventListener("blur", () => {
        focus(input, "has-value");
    });

    input.addEventListener("input", () => {
        checkLength(input);
    });
}

// Handlers
async function onSubmit(inputs, cb) {
    const isValidForm = validateInputs(inputs);

    if (!isValidForm) return;

    await cb();
}

async function loginRequest() {
    const data = getValuesInput(UI.inputsLogin);
    preloader.renderPreloader();
    try {
        await login(data).then((res) => {
            if (res.error) {
                notify({ message: res.message, className: "alert-danger" });
                return;
            }
            notify({ message: "Login success!", className: "alert-success" });
        });
    } catch (error) {
        notify({
            message: error,
            className: "alert-danger",
        });
    }
    preloader.clearPreloader();
}

async function registerRequest() {
    const data = getValuesInput(UI.inputsRegister);
    preloader.renderPreloader();
    try {
        await register(data).then((res) => {
            if (res.error) {
                notify({ message: res.message, className: "alert-danger" });
                return;
            }
            notify({
                message: "Register success!",
                className: "alert-success",
            });
        });
    } catch (error) {
        notify({
            message: error,
            className: "alert-danger",
        });
    }
    preloader.clearPreloader();
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
