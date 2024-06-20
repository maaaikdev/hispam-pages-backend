const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const indexController = require("../controllers/index");
const fs = require('fs');

router.get('/', indexController.index);
router.get('/products', indexController.listOfProducts);
router.post('/new-product', indexController.newProduct);

/* Hispam Page */
router.get('/save-html', indexController.saveHtmlGet);
router.post('/save-html', indexController.saveHtmlPost);
router.get('/get-html', indexController.getHtml);
router.delete('/remove-html/:id', indexController.removeHtml);

// Function to create a folder if it doesn't exist
const createFolderIfNotExists = (folder) => {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
	}
};

// Configuración de multer para guardar las imágenes en una carpeta 'uploads' /// SIN FOLDER ESPECIFICO
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       	cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       	cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// Configure storage with dynamic folder creation
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  const { pageId } = req.body;
	  const uploadPath = path.join('uploads', pageId);
	  createFolderIfNotExists(uploadPath);
	  cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
	  cb(null, Date.now() + path.extname(file.originalname));
	},
});

//router.use('/uploads', express.static('uploads')); // Enrutador estático para la carpeta 'uploads'

const upload = multer({ storage });
router.post('/upload', upload.array('files[]'), indexController.uploadImages);

module.exports = router;