const router = require("express").Router();
const User = require("../models/User")
const bycrypt = require('bcrypt')

router.get('/register', (req, res) => {
    res.send('dang xu ly mongo data')
})
//REGISTER
router.post("/register", async (req,res) => {

    try {
        //create password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(req.body.password, salt)
        
        //create user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        
        //save user
        const user = await newUser.save();
        res.status(200).json(user)
    }catch(err) {
        console.log(err)
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bycrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;