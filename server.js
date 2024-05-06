// const express = require('express');
// const cors = require('cors'); // Importa el paquete cors
// const app = express();
// const port = 3001;

// const fs = require('fs');

// app.use(cors()); // Usa el middleware cors para permitir solicitudes CORS

// app.use(express.json());

// // Ruta para la raíz, puede devolver un mensaje simple
// app.get('/', (req, res) => {
//     res.send('¡Servidor Express en funcionamiento!');
// });

// // Rutas para guardar y recuperar el HTML
// app.post("/save-html", (req, res) => {
//     debugger
//     console.log("REQ, RES", [req, res])
//     // Aquí puedes guardar el HTML en un archivo o base de datos local
//     const { html } = req.body;

//   // Genera un nombre de archivo único basado en la fecha actual
//   const nombreArchivo = `archivo-${Date.now()}.html`;

//   // Escribe el HTML en un archivo en el directorio especificado
//   fs.writeFile(rutaDirectorioHTML + nombreArchivo, html, (err) => {
//     if (err) {
//       console.error('Error al guardar el archivo HTML', err);
//       res.status(500).json({ error: 'Error al guardar el archivo HTML' });
//     } else {
//       console.log('Archivo HTML guardado correctamente');
//       res.status(200).json({ message: 'Archivo HTML guardado correctamente', fileName: nombreArchivo });
//     }
//   });
// });

// app.get('/get-html', (req, res) => {
//     // Aquí debes recuperar el HTML guardado y enviarlo como respuesta
//     res.status(200).sendFile(__dirname + '/ruta/al/archivo.html')
// });

// app.listen(port, () => {    
//     console.log(`Servidor backend iniciado en http://localhost:${port}`)
// })

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
app.use(express.static(path.join(__dirname, 'public')))

// Start the server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
