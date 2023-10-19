const mongoose = require('mongoose');

// Définition du schéma Mongoose pour l'utilisateur
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Création du modèle User basé sur le schéma
const User = mongoose.model('User', userSchema);

// Export du modèle User
module.exports = User;
