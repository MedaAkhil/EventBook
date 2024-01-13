const mongoose = require('mongoose');
const user = mongoose.model('Users');

const userCreate = (req, res) => {
  console.log("fron controller api",req.query.email,req.query.password);
  user.create({
    email: req.query.email,
    password: req.query.password,
  })
  .then((createdUser) => {
    res.status(201).json(createdUser);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};


const userReadOne = async (req, res) => {
  try {
    const userEmail = req.params.email; // Using req.params.email to match the route parameter
    const userdata = await user.findOne({ email: userEmail }).exec();

    if (!userdata) {
      return res.status(404).json({ "message": "User not found" });
    }

    return res.status(200).json(userdata);
  } catch (err) {
    return res.status(500).json(err);
  }
};



module.exports = {
    userCreate,
    userReadOne,
};