const { Router } = require("express");

const router = Router();

const initialTasks = [
  { id: 1, title: "Configurer Jenkins", done: false },
  { id: 2, title: "Ajouter le Jenkinsfile", done: false }
];

let tasks = [...initialTasks];

router.get("/", (_req, res) => {
  res.status(200).json({ tasks });
});

router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Le champ title est requis." });
  }

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    done: false
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

router.post("/reset", (_req, res) => {
  tasks = [...initialTasks];
  res.status(200).json({ tasks });
});

module.exports = router;
