const express = require("express");
const router = express.Router();
router.use(express.json()); //Used to parse JSON bodies
//Need this later
// const jwt = require('jsonwebtoken')
// const passport = require('passport');

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

router.get((req, res)=>{
    res.status(200).text('Hello');
});


// -----------------------------------------
module.exports = router;