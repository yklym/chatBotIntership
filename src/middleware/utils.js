const passport = require("passport");

function checkIdParam(req, res, next) {
    if (!req.params.id) {
        console.log("check id param failed");
        res.status(400).json(new Error("No id parametr, or it is incorrect"));
        return;
    }
    next();
}

function checkForLoginData(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json(new Error("This request must have username and password fields!"));
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
