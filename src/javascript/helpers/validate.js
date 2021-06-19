const regExpDic = {
    email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
    password: /^[0-9a-zA-Z]{4,}$/,
};

function validate(el) {
    const regExpName = el.dataset.required;
    
    if(!regExpDic[regExpName]) return true; // if there is no input for the regular expression, then true is returned
    return regExpDic[regExpName].test(el.value);
}

export { validate };
