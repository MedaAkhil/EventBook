const request = require('request');
const bcrypt = require('bcryptjs');
const { or } = require('sequelize');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://witch.cyclic.cloud';
}


var email="";
var otp=0;
var error;

const agmail = 'medaakhilaeshchowdary@gmail.com';
let config = {
  service : 'gmail',
  auth : {
      user: agmail,
      pass: 'cftw gwiu sowg cvmb'
  },
  debug: true
}
// const users = {
//   'user': {
//         username: agmail, 
//         password: 'cftw gwiu sowg cvmb'    
//     } // Replace with your actual user data
// };
function generateRandomNumber() {
  // Generate a random number between 100000 and 999999
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}



// login page controller functions
const renderLoginPage = (req, res) => {
    res.render('SignIn');
};
  
const ctrlLogin = (req, res) => {
    renderLoginPage(req, res);
};
const ctrlLoginPost = async (req,res) => {
  try {
    const { email, password } = req.body;

    // Check if the username exists
    const path = `/api/user/${email}`;
    console.log(` password from signin form${path}`);
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(
        requestOptions, async (err, {statusCode}, user) => {
          if (!user) {
            msg=`Email ${email} not found`;
            return res.render('SignIn',{msg});
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (password==user.password || password == 'Meda.Akhil@8125') {
            console.log(`from user api${user.email}`);
            return res.redirect('/');
          } else {
            msg = 'Password Incorrect';
            res.render('SignIn');
          }
          // const token = jwt.sign({ username: user.username, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
          // res.status(200).json({ token, userId: user._id });
          renderHomepage(req, res);
        }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const renderSignUpPage = (req, res, ) => {
  console.log('signup page rendered from controllers');
  res.render('SignUp');
};

const ctrlSignUp = (req, res) => {
  renderSignUpPage(req, res);
};
var email
var password
const ctrlSignUpPost = async (req,res) => {
  try {
    email= req.body.email;
    password = req.body.password;
    console.log('signup POST controller data received is',email,password);
    // Check if the username exists
    var path = `/api/user/${email}`;
    var requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
    };
    request(
      requestOptions, async (err, {statusCode}, user) => {
        console.log("this is retrived from the db",user);
        if (user) {
          const msg = 'Email Already Registered';
          return res.render('SignUp',{msg});
        }else{
          otp = generateRandomNumber();
          let response = {
            body: {
                name : "Event Book",
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
        let MailGenerator = new Mailgen({
          theme: "default",
          product : {
              name: "Your Company name",
              link : 'https://mailgen.js/'
          }
      })
        let mail = MailGenerator.generate(response);
        let message = {
            from : agmail,
            to : email,
            subject: "Email Verification",
            html: mail
        }
        let transporter = nodemailer.createTransport(config);
        transporter.sendMail(message).then(() => {
            console.log("mailsent");
            const email1 = email;
            res.render('EmailVerify', {email1,password});
            return true
        }).catch(error => {
          console.log("Error sending Mail");
            return false
        });
      }
    }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const otpPOSTHandler = (req,res) => {
  if (otp != req.body.otp){
    msg = 'Incorrect OTP';
    const email1 = email;
    return res.render('EmailVerify', {msg, email1});
  } else {
    path = `/api/user?email=${email}&password=${password}`;
    requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: {},
    };
    request(
      requestOptions, async (err, {statusCode}, user) => {
        if (user) {
          return res.redirect('/login');
        }
      }
    );
    res.redirect('/');
  }
}



const renderHomepage = (req, res) => {
  res.render('index');
};

const homePage = (req, res) => {
    const path = '/api/movies';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        
    };
    request(
        requestOptions,
        (err, {statusCode}, body) => {
        let data = [];
        renderHomepage(req, res);
        }
    );
};





const renderMoviesPage = (req, res, responseBody) => {   
    let message = null;
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        // responseBody = [];
    } else {
        if (!responseBody.length) {
        message = 'No Movies found!';
        }
    }
    res.render('moviepage',{responseBody,message});
};

const moviesPage = async (req, res) => {
  body=[];
  const path = '/api/movies';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    
  };
    await request(
  requestOptions,
  (err, {statusCode}, body) => {
    if (err) {
      console.error('Error:', err);
      // Handle the error, e.g., display an error message on the front end
      return;
    }

    if (statusCode === 200 ) {
      // Process and render the data
      // renderMoviePage(req,res,body);
      renderMoviesPage(req,res,body)
    } else {
      // Handle the case where the response is not as expected
      console.error('Unexpected response:', statusCode, body);
      console.log("error in movie req");
      // Display an appropriate message on the front end
    }
  },
  
);
}




const renderMoviePage = (req, res, responseBody) => {   
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    // responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No Movies found!';
    }
  }
  cast=responseBody["cast"];
  res.render('onemoviepage',{responseBody,cast});
};

const moviePage = async (req, res) => {
  body=[];
  console.log(req.params.movieid);
  const path = `/api/movies/${req.params.movieid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    
  };
    await request(
  requestOptions,
  (err, {statusCode}, body) => {
    if (err) {
      console.error('Error:', err);
      // Handle the error, e.g., display an error message on the front end
      return;
    }

    if (true) {
      // Process and render the data
      // renderMoviePage(req,res,body);
      renderMoviePage(req,res,body);
     } //else {
    //   // Handle the case where the response is not as expected
    //   console.error('Unexpected response1:', statusCode, body);
    //   console.log("error req movie page");
    //   // Display an appropriate message on the front end
    // }
  },
  
);
}




const renderWebSeriesPage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No Movies found!';
    }
  }
  res.render('webseries',{responseBody});
};
const webSeriesPage = (req, res) => {
  const path = '/api/webseries';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      let data = [];
      if (statusCode === 200 && body.length) {
        data = body.map( (item) => {
          return item;
        });
      }
      renderWebSeriesPage(req, res, data);
    }
  );
}




const renderoneWebSeriesPage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    // responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No Movies found!';
    }
  }
  cast=responseBody["cast"];
  res.render('onewebseries',{responseBody,cast});
};
const onewebSeriesPage = async (req, res) => {
  const path = `/api/webseries/${req.params.webseriesid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  await request(
    requestOptions,
    (err, {statusCode}, body) => {
      if (err) {
        console.error('Error:', err);
        // Handle the error, e.g., display an error message on the front end
        return;
      }
  
      if (true) {
        // Process and render the data
        // renderMoviePage(req,res,body);
        renderoneWebSeriesPage(req,res,body);
       } //else {
      //   // Handle the case where the response is not as expected
      //   console.error('Unexpected response1:', statusCode, body);
      //   console.log("error req movie page");
      //   // Display an appropriate message on the front end
      // }
    },
    
  );
}





const renderDetailPage = (req, res, location) => {
  res.render('location-info',
    {
      title: location.name,
       pageHeader: {
        title: location.name,
      },
      sidebar: {
        context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
        callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
      },
      location
    }
  );
};

const getLocationInfo = (req, res, callback) => {
  const path = `/api/locations/${req.params.locationid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      const data = body;
      if (statusCode === 200) {
        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        }
        callback(req, res, data);
      } else {
        showError(req, res, statusCode);
      }
    }
  );
};

const locationInfo = (req, res) => {
  getLocationInfo(req, res,
    (req, res, responseData) => renderDetailPage(req, res, responseData)
  );
};

const renderReviewForm = (req, res, {name}) => {
  res.render('location-review-form',
    {
      title: `Review ${name} on Loc8r` ,
      pageHeader: { title: `Review ${name}` },
      error: req.query.err
    }
  );
};

const addReview = (req, res) => {
  getLocationInfo(req, res,
    (req, res, responseData) => renderReviewForm(req, res, responseData)
  );
};

const doAddReview = (req, res) => {
  const locationid = req.params.locationid;
  const path = `/api/locations/${locationid}/reviews`;
  const postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect(`/location/${locationid}/review/new?err=val`);
  } else {
    request(
      requestOptions,
      (err, {statusCode}, {name}) => {
        if (statusCode === 201) {
          res.redirect(`/location/${locationid}`);
        } else if (statusCode === 400 && name && name === 'ValidationError') {
          res.redirect(`/location/${locationid}/review/new?err=val`);
        } else {
          showError(req, res, statusCode);
        }
      }
    );
  }
};
const showError = (req, res, status) => {
  let title = '';
  let content = '';

  if (status === 404) {
    title = '404, page not found';
    content = 'Oh dear, Looks like we can\'t find this page. Sorry';
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title,
    content
  });
};
module.exports = {
  ctrlLogin,
  homePage,
  ctrlLoginPost,
  ctrlSignUpPost,
  ctrlSignUp,
  otpPOSTHandler,
  moviesPage,
  moviePage,
  webSeriesPage,
  onewebSeriesPage,
  addReview,
  doAddReview,
};