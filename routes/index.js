const express = require('express');
const router = express.Router();

const indexController = require("../controllers/index")

router.get('/', indexController.index);

router.get('/products', indexController.listOfProducts);

router.post('/new-product', indexController.newProduct);

router.get('/save-html', indexController.saveHtmlGet);

router.post('/save-html', indexController.saveHtmlPost);

router.get('/get-html', indexController.getHtml);

module.exports = router;