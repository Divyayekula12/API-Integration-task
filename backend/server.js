const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = './students.json';

app.use(cors());
app.use(bodyParser.json());

// Read students data
app.get('/students', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) res.status(500).send("Error reading file");
        else res.json(JSON.parse(data));
    });
});

// Add a student
app.post('/students', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        let students = JSON.parse(data);
        let newStudent = { id: Date.now(), ...req.body };
        students.push(newStudent);

        fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), (err) => {
            if (err) res.status(500).send("Error writing file");
            else res.json(newStudent);
        });
    });
});

// Update a student
app.put('/students/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        let students = JSON.parse(data);
        let id = parseInt(req.params.id);
        let index = students.findIndex(s => s.id === id);

        if (index !== -1) {
            students[index] = { ...students[index], ...req.body };
            fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), (err) => {
                if (err) res.status(500).send("Error updating file");
                else res.json(students[index]);
            });
        } else {
            res.status(404).send("Student not found");
        }
    });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        let students = JSON.parse(data);
        let id = parseInt(req.params.id);
        students = students.filter(s => s.id !== id);

        fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), (err) => {
            if (err) res.status(500).send("Error deleting file");
            else res.json({ message: "Student deleted" });
        });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


