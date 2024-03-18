const express = require("express")
const mongoose = require("mongoose")
const booksRoute = require('./routes/booksRoute')
const cors = require("cors")

const app = express()

app.use(express.json())

//Middleware for handling CORS Policy
app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.get('/', (req, res) => {
    return res.status(234).send("Book store app")
})

app.use('/books', booksRoute)

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/Bookstore")
        app.listen(4000, () => console.log("Database connected"))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
dbConnect()
