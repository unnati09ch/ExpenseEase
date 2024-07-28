const express = require('express');
const router = express.Router();
const UserControllers=require("../controllers/usercontroller");
const bcrypt=require("bcrypt");
// const protect=require("../middlewares/authmiddleware");


router.post("/login",UserControllers.login);

router.post("/signup",UserControllers.signup);

module.exports=router;