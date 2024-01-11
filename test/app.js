const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

const users = {
  'user': {
        username: 'a', 
        password: 'a'    
    } // Replace with your actual user data
};

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    secure: false, // Set to true in a production environment if using HTTPS
  },
}));

const isAuthenticated = (req) => req.session.user;

app.get('/', (req, res) => {
  const user = req.session.user;
  res.render('index', { user });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
    console.log('reqbody var',username,password);
  const user = users[username];
    console.log('exinsting user',user);
  if ('a' == password) {
    req.session.user = { username };
    console.log('password correct');
    res.redirect('/');
  } else {
    console.log('password incorrect');
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
