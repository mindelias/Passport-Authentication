var express = require("express");
var router = express.Router();

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
  const { firstName, email, password, password2 } = req.body;
  let errors = [];
  // validate
  if (!firstName || !email || !password || !password2) {
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
      res.render('register', {
         errors, firstName, email, password, password2
      })
   }
   else {
      res.send('rediect to login page')
   }
   
   
});

module.exports = router;
