const { User, Thought } = require("../models");

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughtDB = await Thought.find();
      res.json(thoughtDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getSingleThought: async (req, res) => {
    try {
      const thoughtDB = await Thought.findById(req.params.id);
      res.json(thoughtDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  createThought: async (req, res) => {
    try{
      const newThought = await Thought.create(req.body)
      const thoughtDB = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      )
      !thoughtDB
        ? res.status(404).json({ message: "Thought created, but found no User with that username"})
        : res.json("Created new thought :)")
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // getAllThoughts: async (req, res) => {
  //   try{

  //   }catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // },
  // getAllThoughts: async (req, res) => {
  //   try{

  //   }catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // }
};
