const { getAllUsers, getSingleUser } = require("../../controllers/userController");

const router = require("express").Router();


router.route("/")
.get(getAllUsers)
.post();
router.route("/:id")
.get(getSingleUser)
.put()
.delete();
router.route("/:id/friends/:friendId")
.post()
.delete();

module.exports = router;