import "./index";
import intlTelInput from "intl-tel-input";
import UI from "../../config/ui.config";

const phone_input = UI.inputsRegister.phone;

intlTelInput(phone_input, {});
