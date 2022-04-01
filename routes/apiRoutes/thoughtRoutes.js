const { getAllThoughts, getSingleThought, createThought, updateThought, deleteThought, addThoughtReaction, deleteThoughtReaction} = require("../../controllers/thoughtController");

const router = require("express").Router();

//Thought Routes
router.route("/")
.get(getAllThoughts)
.post(createThought);
router.route("/:id")
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);
//Reaction Routes
router.route("/:id/reactions")
.post(addThoughtReaction)
router.route("/:id/reactions/:reactionId")
.delete(deleteThoughtReaction);

module.exports = router