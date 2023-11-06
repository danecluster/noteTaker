const express = require('express');
const path = require('path');
const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for feedback page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for /api/notes
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './db/db.json'))
);

// Post Route for /api/notes
app.post('/api/notes', (req,res) => {
    let myNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let inNote = req.body;
    let newID = myNotes.length.toString();
    inNote.id = newID;
    myNotes.push(inNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(myNotes));
    res.json(myNotes);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
