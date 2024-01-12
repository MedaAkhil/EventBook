const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://witch.cyclic.cloud';
}





// login page controller functions
const renderLoginPage = (req, res, responseBody) => {
    res.render('index',{responseBody,message});
};
  
const ctrlLogin = (req, res) => {
    renderLoginPage(req, res);
};
const ctrlLoginPost = (req,res) => {
  
}

const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
        message = 'No Movies found!';
        }
    }
    res.render('index',{responseBody,message}
    );
};

const homePageweb = (req, res, {mdata}) => {
    const path = '/api/webseries';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        
    };
    request(
        requestOptions,
        (err, {statusCode}, body) => {
        let data = [];
        if (statusCode === 200 && body.length) {
            wdata = body.map( (item) => {
            return item;
            });
        }
        renderHomepage(req, res, {mdata,wdata});
        }
    );
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
        if (statusCode === 200 && body.length) {
            mdata = body.map( (item) => {
            return item;
            });
        }
        homePageweb(req, res, {mdata});
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
  moviesPage,
  moviePage,
  webSeriesPage,
  onewebSeriesPage,
  addReview,
  doAddReview,
};