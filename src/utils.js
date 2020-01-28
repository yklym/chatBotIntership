const crypto = require("crypto");

function checkIdParam(req, res, next) {
    if (!req.params.id) {
        console.log("check id param failed");
        res.status(400).json({ err: "No id parametr, or it is incorrect" });
    } else {
        next();
    }
}
function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
}

function checkUser(req, res, next) {
    if (!req.user) return res.sendStatus(401); // 'Not authorized'
    next(); // пропускати далі тільки аутентифікованих
}

function checkAdmin(req, res, next) {
    if (!req.user) res.sendStatus(401); // 'Not authorized'
    else if (req.user.role !== 1) res.sendStatus(403); // 'Forbidden'
    else next(); // пропускати далі тільки аутентифікованих із роллю 'admin'
}

module.exports = {
    checkIdParam,
    sha512,
};
