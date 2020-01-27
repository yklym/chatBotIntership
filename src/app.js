const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, 'config/.env') });

const app = express();

const apiRoute = require("./routes/index");

app.use("/api", apiRoute);

app.get('*', (req, res) => {
    res.status(404).json({ error: "wrong api route" });
});


// @part Running-------------------------------------------------------
const dbUrl = process.env.MONGODB_URI;
// || 'mongodb://localhost:27017/internship';
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

mongoose.connect(dbUrl, connectOptions)
    .then(() => console.log('Mongo database connected'))
    .catch(() => console.log('ERROR: Mongo database not connected'));

const port = process.env.PORT;
// || 5000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
