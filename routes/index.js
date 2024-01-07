var express = require('express');
var router = express.Router();
var email="";
var otp=0;
var error;
/* GET home page. */
function generateRandomNumber() {
  // Generate a random number between 100000 and 999999
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('SignUp');
});
router.get('/signup/emailverify', function(req, res, next) {
  email = req.query.username;
  console.log(req.query.username);
  otp = generateRandomNumber();
  console.log(otp);
  res.render('EmailVerify',{email});
});
router.post('/otp', (req,res) =>{
  var otpu = req.body.otp;
  console.log("otp",otpu,otp);
  if(otp == otpu){
    res.redirect('/');
  } else{
    error = "Invalid Otp";
    res.render('SignUp', {error});
  }
})

module.exports = router;