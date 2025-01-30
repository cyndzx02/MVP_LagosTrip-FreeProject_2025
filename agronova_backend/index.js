require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Ajout d'un port par défaut
const userRoutes = require('./routes/API/routes_query'); 
const { generateToken } = require('./routes/API/service');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/info', (req, res) => {
    res.send("Hello World");
    console.log("Hello guys, I need some chocolate");
});

app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur est survenue !' });
});

app.listen(port, () => {
    console.log(`Agronova app successfully listening at http://localhost:${port}`);
});
