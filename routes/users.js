var express = require("express");
var router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("");
});
//  login
router.get("/login", function(req, res, next) {
  res.render("login");
});
// Register Page
router.get("/register", function(req, res, next) {
  res.render("register");
});

router.post("/register", function(req, res, next) {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  // validate
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  // check if all password match
  if (password != password2) {
    errors.push({ msg: "Password do not match" });
  }
  // check password length
  if (password.length <= 5) {
    errors.push({ msg: "password should be atleast 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //  Validation Passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        //  user already exist
        errors.push({ msg: "Email is already registered" });
        res.render("register", { errors, name, email, password, password2 });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(() => res.redirect('/users/login')).catch(err => console.log(err))
          })
        );
        // console.log(newUser);
        // res.send(newUser);
      }
    });
  }
});

module.exports = router;
