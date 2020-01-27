function checkIdParam(req, res, next) {
    if (!req.params.id) {
        res.status(400).json({ err: "No id parametr, or it is incorrect" });
    } else {
        next();
    }
}

module.exports = {
    checkIdParam,
};
