const mongoose = require('mongoose');


module.exports = function (dbUrl = "", opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}) {
    return mongoose.connect(dbUrl, opts).then().catch((err) => {
        throw err;
    });
};
