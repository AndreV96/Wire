const { getAllThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction} = require("../../controllers/thoughtController");

const router = require("express").Router();

router.route("/")
.get(getAllThoughts)
.post(createThought);
router.route("/:id")
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);
router.route("/api/thoughts/:id/reactions")
.post(addReaction)
.delete(deleteReaction);

module.exports = router