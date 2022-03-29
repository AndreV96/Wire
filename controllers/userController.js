const { User } = require("../models");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const userDB = await User.find()
      .populate("thoughts")
      .populate("friends");
      res.json(userDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const userDB = await User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends");
      res.json(userDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      // Example data
      // {
      //   "username": "lernantino",
      //   "email": "lernantino@gmail.com"
      // }
      res.json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const userDB = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      //Will this work?
      !userDB
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(userDB)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
