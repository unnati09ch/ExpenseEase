const User = require("../models/UserModel");
const express = require("express");
const bcrypt = require("bcrypt");
const generatetoken = require("../config/generatetoken")
exports.login = async (req, res) => {
  console.log("req accepted");
  if (!req.body.email || !req.body.password)
    res.send({
      message: "Please fill all the fields",
    });
  

  else {
    const result = await User.findOne({ email: req.body.email });

    if (result) {
      bcrypt.compare(req.body.password, result.password, function (err, resul) {

        if (resul) {
          


          res.send({
            _id: result._id,
            token: generatetoken(result._id),
            name: result.name,
            email: result.email,
            gender: result.gender,
            pic: result.pic,



          });

        }

        else {
          res.send({
            message: "wrong pas",
          });
          //res.send("wrong pas")
        }

      });

    }
    else {
      res.send({
        message: "user not found",
      });
      //throw new Error("user not found");
      //res.send("user not found");

    }
  }
}





exports.signup = async (req, res) => {
  console.log("signup controller strted");
  if (!req.body.email || !req.body.name || !req.body.password || !req.body.confirmpassword || !req.body.gender)
    res.send({message:"Please fill all the fields"});
  else {
    try {

      const result = await User.findOne({ email: req.body.email });

      if (!result) {
        if (req.body.confirmpassword == req.body.password) {

         

          const user = new User({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            pic: `https://avatar.iran.liara.run/public/${req.body.gender}`

          });

          await user.save();
          // console.log(req.body.gender);
          const a = generatetoken(user._id);
          //  console.log(a);
         
          res.send({
            _id: user._id,
            token: a,
            name: user.name,
            email: user.email,
            gender: user.gender,
            pic: user.pic,
          });
        }

        else {

          res.send({
            message: "passwords dont match",
          });
        }
      }
      else {
       
        res.send({
          message: "user exists",
        });


      }
    }
    catch (err) {
      console.log("error in singup controller",err);
    }
  }

};



