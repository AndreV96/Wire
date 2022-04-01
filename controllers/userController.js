const { User, Thought } = require("../models");

const userController = {
  //GET all
  getAllUsers: async (req, res) => {
    try {
      const userDB = await User.find()
      .populate("thoughts")
      .populate("friends");
      res.json(userDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  },
  //Get one
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
  //POST
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
  //PUT
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
  //DELETE
  deleteUser: async (req, res) => {
    try {
      const userDB = await User.findOneAndDelete({_id: req.params.id})
      //Will this work?
      if (!userDB) {
         res.status(404).json({ message: 'No user with this id!' })
        //Delete al thought associated with this user
      } else {
        await Thought.deleteMany ({ _id: {$in: userDB.thoughts}})
        res.json({ message: 'User and Thoughts deleted!' })
      }  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // POST add friend
  addFriend: async (req, res) => {
    try {
      const userDB = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId} },
        { runValidators: true, new: true }
      );
      !userDB
        ? res.status(404).json({ message: 'No user found with the first id provided!' })
        : res.json(userDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE friend
  deleteFriend: async (req, res) => {
    try {
      const userDB = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId} },
        { runValidators: true, new: true }
      );
      !userDB
        ? res.status(404).json({ message: 'No user found with the first id provided!' })
        : res.json(userDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
