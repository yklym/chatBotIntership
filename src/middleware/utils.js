const passport = require("passport");

function checkIdParam(req, res, next) {
    if (!req.params.id) {
        console.log("check id param failed");
        res.status(400).json({ err: "No id parametr, or it is incorrect" });
    } else {
        next();
    }
}
const checkBasicAuth = passport.authenticate('basic', { session: false });


module.exports = {
    checkIdParam,
    checkBasicAuth,
};
