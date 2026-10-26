const express = require("express");

const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
    res.json(tasks);
});

router.post("/", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const newTask = {
        id: Date.now(),
        title: title
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

module.exports = router;