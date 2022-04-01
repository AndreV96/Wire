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
      !thoughtDB
        ? res.status(404).json({message: "No though found with that id"})
        : res.json(thoughtDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      // Example data
      // {
      //   "thoughtText": "Here's a cool thought...",
      //   "username": "lernantino",
      //   "userId": "5edff358a0fcb779aa7b118b"
      // }
      const thoughtDB = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      !thoughtDB
        ? res
            .status(404)
            .json({
              message: "Thought created, but found no User with that id",
            })
        : res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateThought: async (req, res) => {
    try {
      const thoughtDB = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      !thoughtDB
        ? res.status(404).json({ message: "No thought with this id!" })
        : res.json(thoughtDB);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  deleteThought: async (req, res) => {
    try {
      const thoughtDB = await Thought.findOneAndRemove({ _id: req.params.id });
      if (!thoughtDB)
        res.status(404).json({ message: "No thought with this id!" });
      if (thoughtDB) {
        await User.findOneAndUpdate(
          { _id: thoughtDB.userId },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        );
        res.json({ message: "Thought deleted!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  addThoughtReaction: async (req, res) => {
    try {
      const thoughtDB = await Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
      )
      !thoughtDB
        ? res.status(404).json({ message: 'No thought found with this id!' })
        : res.json(thoughtDB)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  deleteThoughtReaction: async (req, res) => {
    try {
      const thoughtDB = await Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { reactions: {_id: req.params.reactionId} } },
          { runValidators: true, new: true }
      )
      !thoughtDB
        ? res.status(404).json({ message: 'No thought found with this id!' })
        : res.json(thoughtDB)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;