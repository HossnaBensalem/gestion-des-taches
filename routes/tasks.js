const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Ajouter une tâche
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Titre et description requis' });
        }
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

// Afficher toutes les tâches
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

// Mettre à jour une tâche
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.json({ message: 'Tâche supprimée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

module.exports = router;
