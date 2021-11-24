const mongosse = require('mongoose')

const CommentSchema = new mongosse.Schema(
  {
    PostId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongosse.model('Comment', CommentSchema)


