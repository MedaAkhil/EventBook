const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/example', (req, res) => {
  // Example data from the res object
  const dataFromRes = {
    username: 'John Doe',
    email: 'john@example.com'
  };

  // Redirect to another route with query parameters
  res.redirect(`/redirected?data=${encodeURIComponent(JSON.stringify(dataFromRes))}`);
});

app.get('/redirected', (req, res) => {
  // Extract data from query parameters and parse JSON
  const dataString = req.query.data;
  const data = JSON.parse(decodeURIComponent(dataString));

  // Render the Pug template and pass data as local variables
  res.render('redirected', { data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
