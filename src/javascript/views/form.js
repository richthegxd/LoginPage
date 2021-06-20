function showInputError(el) {
    const parent = el.parentElement;

    if (parent.querySelector(".invalid-feedback")) return;

    const message = el.dataset.invalidMessage || "Please, check the correctness of the entered data!";
    const templateMessage = inputErrorTemplate(message);

    el.classList.add("is-invalid");

    if(el.id === "phone") {
        parent.insertAdjacentHTML("afterend", templateMessage);
    } else {
        parent.insertAdjacentHTML("beforeend", templateMessage);
    }
    
}

function removeInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector(".invalid-feedback");
    if (!err) return;

    el.classList.remove("is-invalid");
    parent.removeChild(err);
}

function inputErrorTemplate(message) {
    return `
        <div class="invalid-feedback">
            <p>${message}</p>
        </div>
    `;
}

export { showInputError, removeInputError };
