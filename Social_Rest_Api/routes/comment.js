const router = require('express').Router()
const Comment = require('../models/Comment')

//new Comment
router.post('/', async (req, res) => {
  const newComment = new Comment(req.body)
  try {
    const saveComment = await newComment.save()
    res.status(200).json(saveComment)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get Comment
router.get('/:postId', async (req, res) => {
  try {
    const comment = await Comment.find({postId: req.params.postId})
    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router