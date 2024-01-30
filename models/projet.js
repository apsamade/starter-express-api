const mongoose = require('mongoose')

// projet
const projetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    link: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });
// enregistrement du mot de passe hashé

const Projet = mongoose.model('Projet', projetSchema, 'projets');
module.exports = Projet;