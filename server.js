const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


// Connexion à MongoDB

mongoose.connect('mongodb+srv://Clems:Clems9080@smith.7bo1y.mongodb.net/Smith?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie avec succès !'))
  .catch(err => console.error('Connexion à MongoDB échouée :', err));

// Middleware

// Configuration de CORS
/*app.use(cors({
    origin: (origin, callback) => {
        if (!origin || ['http://localhost:8080', 'http://localhost:8081'].includes(origin)) {
            callback(null, true); // Autorise l'origine
        } else {
            callback(new Error('Not allowed by CORS')); // Rejette l'origine
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));*/


app.use(cors({
    origin: '*',  // Autorise toutes les origines
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));

/*app.use(cors({
    origin: 'http://localhost:8080',  // Autorise uniquement les requêtes de cette origine
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use("/api/post", require("./routes/post.routes"));


app.use("/api/order", require("./routes/order.routes"));

app.use("/api/history", require("./routes/history.routes"));



app.use("/api/user", require("./routes/user.routes"));




// Démarrage du serveur
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
};
const port = normalizePort(process.env.PORT || '3000');

app.listen(port, () => {
  console.log('Le serveur a démarré au port ' + port);
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur.' });
});

//Fin du programme...
