var express = require('express');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');



var router = express.Router();
var email="";
var otp=0;
var error;

const agmail = 'medaakhilaeshchowdary@gmail.com';
let config = {
  service : 'gmail',
  auth : {
      user: agmail,
      pass: 'vmwn taqw iytu yrpq'
  },
  debug: true
}
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
  email = req.query.email;
  console.log("this is username",req.query.email);
  otp = generateRandomNumber();
  console.log("generated OTP",otp);
  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Your Company name",
        link : 'https://mailgen.js/'
    }
})

let response = {
    body: {
        name : "Event",
        intro: "Your Response have been taken",
        table : {
            data : [
                {
                    item : "your OTP To Register",
                    otp : otp,
                }
            ]
        },
        outro: "Looking forward to do more Events"
    }
}

let mail = MailGenerator.generate(response)

let message = {
    from : agmail,
    to : email,
    subject: "Email Verification",
    html: mail
}

transporter.sendMail(message).then(() => {
    console.log("mailsent");
    return true
}).catch(error => {
  console.log("Error sending Mail");
    return false
})
  res.render('EmailVerify',{email});
});
router.post('/otp', (req,res) =>{
  var otpu = req.body.otp;
  console.log("otp",otpu,otp);
  if(otp == otpu){
    res.redirect('/');
  } else{
    error = "InvalidOtp";
    // res.session['success']=error;
    res.redirect(`/signup?mes=${error}`);
  }
})

module.exports = router;