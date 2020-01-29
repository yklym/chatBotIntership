const express = require('express');
const path = require("path");
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const busboyBodyParser = require('busboy-body-parser');
const connectDb = require('./db/db.js');
require('dotenv').config({ path: path.resolve(__dirname, 'config/.env') });

const app = express();

app.use(busboyBodyParser({
    limit: '5mb',
}));

const { myBasicStrat } = require('./middleware/auth/basic.js');

passport.use(new BasicStrategy(myBasicStrat));
app.use(passport.initialize());

const apiRoute = require("./routes/index");

app.use("/api", apiRoute);

app.get('*', (req, res) => {
    res.status(404).json({ error: "wrong api route" });
});

// @part Running-------------------------------------------------------
try {
    connectDb();
    console.log("database connected");
} catch (err) {
    console.log(err);
    process.exit(1);
}
const port = process.env.PORT;// 5000
app.listen(port, () => console.log(`App is listening on port ${port}`));
