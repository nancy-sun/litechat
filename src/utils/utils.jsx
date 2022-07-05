const getColorByName = (username) => {
    let result = [];
    for (let i = 0; i < username.length; i++) {
        result.push(username.charCodeAt(i).toString(16));
    }
    let color = result.join("").slice(3, 6);
    return color;
}

export { getColorByName };