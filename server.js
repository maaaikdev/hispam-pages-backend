// server.js
const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const path = require('path')
const port = 3000; // Puedes cambiar el puerto si lo deseas
const bodyParser = require('body-parser')
const routes = require("./routes/index")

// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next();
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(cors());

//Routes
app.use(routes)

//Static files
app.use('/', routes); // Usa las rutas definidas primero
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
