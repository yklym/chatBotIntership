const mongoose = require('mongoose');


module.exports = function (dbUrl = process.env.MONGODB_URI, opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}) {

    mongoose.connect(dbUrl, opts)
        .then()
        .catch((err) => {
            throw err;
        });
};
