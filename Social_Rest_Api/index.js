const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")

//router
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")

//port
const port = 8800

dotenv.config()
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true 
})
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
//app.use(morgan('combined'))

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(port, () => {
    console.log("Backend Server is running!")
})