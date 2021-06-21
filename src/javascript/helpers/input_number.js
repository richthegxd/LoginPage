function checkLength(el) {
    if(el.value.length >= el.dataset.maxlength) {
        el.value = el.value.slice(0, el.dataset.maxlength)
    }
}

export default checkLength;