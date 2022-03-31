const {Schema, Types} = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //get: create function with moment.js to format date
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

module.exports = reactionSchema;
