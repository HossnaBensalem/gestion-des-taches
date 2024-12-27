const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gestionnaire_taches', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.use('/api/tasks', taskRoutes);

// Démarrer le serveur
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`API en écoute sur le port ${PORT}`);
});
