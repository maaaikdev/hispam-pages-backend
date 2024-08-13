const fs = require('fs');
const path = require('path');

const items = [
  { id: 1, name: 'product1' },
  { id: 2, name: 'product2' },
  { id: 3, name: 'product3' }
];

const jsonPagesPath = 'save-glp.json';
let listLandingPage = [];

try {
  const jsonPages = fs.readFileSync(jsonPagesPath, 'utf-8');
  listLandingPage = JSON.parse(jsonPages);
} catch (err) {
  console.error('Error al leer el archivo JSON:', err);
}

const getHtml = (req, res) => {
  res.json(listLandingPage);
}

const index = (req, res) => {
  res.render('index', { title: "My web store" });
}

const listOfProducts = (req, res, next) => {
  res.render('products', { title: "List of products", items: items });
}

const newProduct = (req, res, next) => {
  const { newItem } = req.body;
  items.push({ id: items.length + 1, name: newItem });
  res.redirect('/products');
}

const saveHtmlGet = (req, res) => {
  res.render('save-html');
}

const saveHtmlPost = (req, res, next) => {
  const { styles, component, id, name } = req.body;

  if (!id || !styles || !name || !component) {
    res.status(400).send("Entries must have a html and css");
    return;
  }

  // Buscar la página existente por su ID
  const existingPageIndex = listLandingPage.findIndex(page => page.id === id);

  if (existingPageIndex !== -1) {
    listLandingPage[existingPageIndex] = { ...listLandingPage[existingPageIndex], ...req.body, styles, component };
  } else {
    const newLandingPage = { id, name, styles, component };
    listLandingPage.push(newLandingPage);
  }

  const jsonPages = JSON.stringify(listLandingPage);
  fs.writeFileSync(jsonPagesPath, jsonPages, 'utf-8');

  console.log('Página guardada:', listLandingPage[existingPageIndex] || newLandingPage);

  res.status(200).json({ message: 'HTML guardado exitosamente' });
}

const removeHtml = (req, res, next) => {
  const idToRemove = parseInt(req.params.id, 10);
  const itemExists = listLandingPage.some(item => item.id === idToRemove);

  if (!itemExists) {
    return res.status(404).json({ message: 'Item not found' });
  }

  listLandingPage = listLandingPage.filter(item => item.id !== idToRemove);

  const jsonPages = JSON.stringify(listLandingPage);
  fs.writeFileSync(jsonPagesPath, jsonPages, 'utf-8');

  console.log('Página eliminada:', idToRemove);

  return res.status(200).json({ message: 'Item removed successfully', updatedArray: listLandingPage });
};

const uploadImages = (req, res) => {
    if (!req.files) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }
    
	//FOLDRR ESPECIFICO
	const { pageId } = req.body;
	const fileUrls = req.files.map(file => ({
		url: `http://localhost:3000/uploads/${pageId}/${file.filename}`
    //url: `https://hispam-pages-backend.onrender.com/uploads/${pageId}/${file.filename}`
    //https://hispam-pages-backend.onrender.com
	}));

	// SIN FOLDER ESPECIFICO
    // const fileUrls = req.files.map(file => ({
    //     url: `http://localhost:3000/uploads/${file.filename}`
    // }));
    
    res.json(fileUrls);
};

module.exports = {
  index,
  listOfProducts,
  newProduct,
  saveHtmlGet,
  saveHtmlPost,
  getHtml,
  removeHtml,
  uploadImages
};