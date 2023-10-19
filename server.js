const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = 3000;
const User = require('./models/User');


// Chargement des variables d'environnement à partir du fichier .env
dotenv.config({ path: './config/.env' })

// Connexion à MongoDB à l'aide de Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connecté à la base de données MongoDB');
})
.catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
});

app.use(express.json());

// Route pour retourner tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
});

// Route pour ajouter un nouvel utilisateur à la base de données
app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
});

// Route pour modifier un utilisateur par ID
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la modification de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur' });
    }
});

// Route pour supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
});

// Démarrer le serveur Express
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
