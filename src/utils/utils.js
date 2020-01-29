const crypto = require("crypto");

function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
}

module.exports = {
    sha512,
};
