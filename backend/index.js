const express = require("express")
const mongoose = require("mongoose")
const Book = require("./models/bookModel")

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(234).send("Book store app")
})

// Route for saving a new Book

app.post('/books', async(req, res) => {
    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

app.get('/books', async(req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

// ROute for getting one book from database in id
app.get('/books/:id', async(req, res) => {
    try {
        const {id} = req.params
        const books = await Book.findById(id)
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

// Route for updating a book
app.put('/books/:id', async (req, res) => {
    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required fields"
            })
        }

        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book updated successfully'})

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})

// Route for deleting a book
app.delete('/books/:id', async(req,res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book deleted successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

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
