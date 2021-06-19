function showInputError(el) {
    const parent = el.parentElement;

    if(parent.querySelector(".invalid-feedback")) return;

    const message = el.dataset.invalidMessage || "Invalid input";
    const templateMessage = inputErrorTemplate(message);
    
    el.classList.add("is-invalid");

    parent.insertAdjacentHTML("beforeend", templateMessage);
}

function removeInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector(".invalid-feedback");
    if(!err) return;

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
