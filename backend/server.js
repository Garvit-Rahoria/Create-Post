require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const postModel = require('./src/models/post.model')
const uploadFile = require("./src/services/storage.service")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const upload = multer({ storage: multer.memoryStorage() })


app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log("body:", req.body)
    console.log("file:", req.file)

    if (!req.file) {
        return res.status(400).json({ message: "Image is required" })
    }

    const result = await uploadFile(req.file.buffer, req.file.originalname)
    console.log(result);

    const post = await postModel.create({
        caption: req.body.caption,
        image: result.url
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
})

app.get("/posts", async (req,res) => {

    const posts = await postModel.find()

    return res.status(200).json({
        message: "Posts fetched Successfully",
        posts
    })
})



async function connectDB() {

    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB")
}
connectDB()


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
