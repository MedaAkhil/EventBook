const mongoose = require('mongoose');
const Movies = mongoose.model('Users');

const userCreate = (req, res) => {
  Movies.create({
    email: req.body.email,
    password: req.body.password,
  },
  (err, movie) => {
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      res
        .status(201)
        .json(movie);
    }
  });
};

const userReadOne = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.email).exec();
    if (!movie) {
      return res.status(404).json({"message": "movie not found"});
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(404).json(err);
  }
};



module.exports = {
    userCreate,
    userReadOne,
};