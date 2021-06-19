import "../styles/main.sass";
import slider from "./views/slider";
import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login } from "./sevices/auth.service";
import { notify, removeNotify } from "./views/notification";

const { form, email, password } = UI;
const inputs = [email, password];


// Events
slider.init();

const buttonsSlider = slider.allControls;

buttonsSlider.forEach((button) => {
    button.addEventListener("click", function() {
        slider.selectSlide(this.dataset.indexOfSlide);
        slider.stopSelectSlide();
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit();
});


inputs.forEach((input) => {
    input.addEventListener("focus", () => {
        removeInputError(input);
    });
});

document.body.addEventListener("click", (e) => {
    if(e.target.classList.contains("remove_alert_button")) {
        removeNotify(e.target.dataset.deleteAlertIndex);
    }
})

// Handlers
async function onSubmit() {
    const isValidForm = inputs.every((input) => {
        const isValidInput = validate(input);

        if (!isValidInput) {
            showInputError(input);
        }

        return isValidInput;
    });

    if (!isValidForm) return;
    try {
        await login(email.value, password.value);
        notify({ message: "Login success!", className: "alert-success" });
        form.reset();
    } catch (error) {
        notify({ message: "Login failed!", className: "alert-danger" });
    }
}
