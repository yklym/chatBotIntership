const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const busboyBodyParser = require('busboy-body-parser');
require('dotenv').config({ path: path.resolve(__dirname, 'config/.env') });

const app = express();

app.use(busboyBodyParser({
    limit: '5mb',
}));

const { myBasicStrat } = require('./auth/basic.js');

passport.use(new BasicStrategy(myBasicStrat));
app.use(passport.initialize());

const apiRoute = require("./routes/index");

app.use("/api", apiRoute);

app.get('*', (req, res) => {
    res.status(404).json({ error: "wrong api route" });
});


// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const cookieParser = require('cookie-parser');
// const session = require('express-session');



// app.use(cookieParser());
// app.use(session({
//     secret: "Some_secret^string",
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // визначає, яку інформацію зберігати у Cookie сесії
// passport.serializeUser(function (user, done) {
//     // наприклад, зберегти у Cookie сесії id користувача
//     done(null, user._id);
// });

// // отримує інформацію (id) із Cookie сесії і шукає користувача, що їй відповідає
// passport.deserializeUser(function (id, done) {
//     // отримати користувача по id і викликати done(null, user);
//     // при помилці викликати done(err, null)
// });

// // налаштування стратегії для визначення користувача, що виконує логін
// // на основі його username та password
// passport.use(new LocalStrategy((username, password, done) => {
//     // отримати користувача по його username і password і викликати done(null, user);
//     // при помилці викликати done(err, null)
// }));

// якщо користувач аутентифікований, req.user міститиме його екземпляр
// app.get('/',
//     (req, res) => res.render('register', { user: req.user }));

// // аутентифікація через PassportJS
// // викликає функцію-обробника із обраної стратегії ('local' - LocalStrategy)
// app.post('/login',
//     passport.authenticate('local', { failureRedirect: '/' }),
//     (req, res) => res.redirect('/'));

// // вихід із сесії
// app.get('/logout',
//     (req, res) => {
//         req.logout();
//         res.redirect('/');
//     });

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
