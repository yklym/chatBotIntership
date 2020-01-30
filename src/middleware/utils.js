const passport = require("passport");

function checkIdParam(req, res, next) {
    if (!req.params.id) {
        res.status(400).json({ err: "No id parametr, or it is incorrect" });
        return;
    }
    next();
}

function checkForLoginData(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ err: "This request must have username and password fields!" });
        return;
    }
    next();
}
const checkBasicAuth = passport.authenticate('basic', { session: false });


module.exports = {
    checkIdParam,
    checkBasicAuth,
    checkForLoginData,
};
