const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer")
const path = require("path")

//router
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")

const conversationRouter = require('./routes/conversation')
const messageRouter = require('./routes/message')

//port
const port = 8800

dotenv.config()
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true 
})
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
//app.use(morgan('combined'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File upload successfully")
    } catch (error) {
        console.log(error)
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);

app.listen(port, () => {
    console.log("Backend Server is running!")
})