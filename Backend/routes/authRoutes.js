const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const app  = express();
const {signUp, signin, signout} = require('../controller/user');
const { urlencoded } = require('body-parser');
const { check } = require('express-validator');


router.get("/router",(req,res)=>{
    res.send("hellodf world");
})

router.post('/signup',[
    check('username','This username must be atleast of 3 chars')
    .exists()
    .isLength({min:3}),
     check('password','password must be atleast of 3 chars')
    .exists()
    .isLength({min:3})
],signUp);


router.post('/signin',[
    check('username','This username must be atleast of 3 chars')
    .exists()
    .isLength({min:3}),
    check('password','password must be atleast of 3 chars')
    .exists()
    .isLength({min:3})
],signin);

router.post('/signout',signout);

module.exports =router;