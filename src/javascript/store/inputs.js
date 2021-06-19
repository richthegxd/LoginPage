function getValuesInput(inputs) {
    const values = Object.values(inputs);
    const data = values.reduce((acc, input) => {
        acc[input.id] = input.value.toLowerCase();
        return acc;
    }, {});
    console.log(data);
    return data;
}

export { getValuesInput };
