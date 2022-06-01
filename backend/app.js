const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const fs = require('fs');

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');


const app = express();
app.use(express.json());

// Connexion à la base de données

mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
;


app.use(helmet());


// CORS headers

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

// Création du dossier "images" 

const dir = './images';

fs.access(dir, (error) => {
    if (error) {
        fs.mkdir(dir, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Dossier "images" créé !');
            }
        });
    } else {
        console.log('Dossier "images" présent !');
    }
});


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);



module.exports = app;