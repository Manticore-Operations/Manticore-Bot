const utcNow = () => {
    return new Date().toUTCString();
}

module.exports = {
    utcNow
}