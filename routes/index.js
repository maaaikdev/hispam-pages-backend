const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const indexController = require("../controllers/index");

router.get('/', indexController.index);
router.get('/products', indexController.listOfProducts);
router.post('/new-product', indexController.newProduct);

/* Hispam Page */
router.get('/save-html', indexController.saveHtmlGet);
router.post('/save-html', indexController.saveHtmlPost);
router.get('/get-html', indexController.getHtml);
router.delete('/remove-html/:id', indexController.removeHtml);

// Configuración de multer para guardar las imágenes en una carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

//router.use('/uploads', express.static('uploads')); // Enrutador estático para la carpeta 'uploads'

const upload = multer({ storage });
router.post('/upload', upload.array('files[]'), indexController.uploadImages);

module.exports = router;