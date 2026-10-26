const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Error:", err);
    });

const Task = require("./models/task");

// GET all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ADD task
app.post("/tasks", async (req, res) => {
    try {
        console.log("POST RECEIVED:", req.body);

        const task = new Task({
            title: req.body.title
        });

        await task.save();

        console.log("SAVED:", task);

        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});