const router = require("express").Router();
const Story = require("../models/Story");
const User = require("../models/User");

//create new Story
router.post("/", async (req, res) => {
  const newStory = new Story(req.body);
  try {
    const savedStory = await newStory.save();
    res.status(200).json(savedStory);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get all story
router.get("/", async (req, res) => {
  try {
    const allSrories = await Story.find({});
    res.status(200).json(allSrories);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
