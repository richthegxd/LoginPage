function focus(el, className) {
    if (el.value !== "") {
        el.classList.add(className);
    } else {
        el.classList.remove(className);
    }
}

export { focus };
