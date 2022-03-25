const {User} = require("../models")

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const userDB = await User.find()
      res.json(userDB)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const userDB = await User.findById(req.params.id)
      .populate("thoughts")
      .populate("friends")
      res.json(userDB)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    } 
  }
}




module.exports = userController;