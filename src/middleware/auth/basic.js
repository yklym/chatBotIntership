const Teacher = require('../../db/teacher.js');
const { sha512 } = require('../../utils/utils.js');


function myBasicStrat(username, password, done) {
    Teacher.findByUsername(username).then(tch => {
        if (!tch) {
            console.log("No tch in LOcal Strategy");
            return done(null, false, {
                message: 'Incorrect username.',
            });
        }
        if (tch.password !== sha512(password, process.env.PASS_HASH_SALT)) {

            console.log("incorrect pass in LOcal Strategy");
            return done(null, false, {
                message: 'Incorrect password.',
            });
        }
        console.log(`Auth successful for {${username}}`);
        return done(null, tch);
    }).catch(err => {
        console.log("ERR in LOcal Strategy");
        console.log(err);
        return err;
    });
}

function checkTeacher(req, res, next) {
    if (!req.user) res.sendStatus(401); // 'Not authorized'
    else next();
}

function checkHeadTeacher(req, res, next) {
    if (!req.user) res.sendStatus(401); // 'Not authorized'
    else if (req.user.role !== 1) res.sendStatus(403); // 'Forbidden'
    else next();
}

module.exports = {
    myBasicStrat,
    checkHeadTeacher,
    checkTeacher,
};
