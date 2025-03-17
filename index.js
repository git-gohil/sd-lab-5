const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = []; 

app.get('/whoami', (req, res) => {
    res.json({ studentNumber: "2586288" });
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(c => c.id === req.params.id);
    if (!book) return res.status(404).json({ error: "404 book not found" });
    res.json(book);
});

app.post('/books', (req, res) => {
    const { id, title, details } = req.body;
    if (!id || !title || !Array.isArray(details)) {
        return res.status(400).json({ error: "404 Bad request - Missing either id, title or details" });
    }
    books.push({ id, title, details });
    res.status(201).json({ message: "Book added successfully" });
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "404 book not found" });
    
    const { title, details } = req.body;
    if (title) book.title = title;
    if (details) book.details = details;
    
    res.json({ message: "Book updated successfully" });
});

app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id !== req.params.id);
    res.json({ message: "Book deleted successfully" });
});

app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    
    const { id, author, genre, publicationYear } = req.body;
    if (!id || !author || !genre || !publicationYear) {
        return res.status(400).json({ error: "Missing required detail fields" });
    }
    
    book.details.push({ id, author, genre, publicationYear });
    res.status(201).json({ message: "Detail added successfully" });
});

app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    
    book.details = book.details.filter(d => d.id !== req.params.detailId);
    res.json({ message: "Detail removed successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
