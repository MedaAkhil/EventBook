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
  msg = req.query.msg;
  if (msg){
    console.log("from signup route msg",msg);
    res.render('SignUp',{msg});
  }else{
    console.log("from signup route else",msg);
    res.render('SignUp');
  }
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
        name: "Event Book",
        link : 'https://google.com'
    }
})

let response = {
    body: {
        name : "Event",
        intro: "Your account creation have been initialized",
        table : {
            data : [
                {
                    item : "your OTP To SignUp",
                    otp : otp,
                }
            ]
        },
        outro: "Explore more from EventBook"
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
    error = "Invalid Otp try again";
    // res.session['success']=error;
    res.redirect(`/signup?msg=${error}`);
  }
})

module.exports = router;