const fs = require('fs');

const items = [
    { id: 1, name: 'product1' },
    { id: 2, name: 'product2' },
    { id: 3, name: 'product3' }
];

const json_pages = fs.readFileSync('save-glp.json', 'utf-8');

let listLandingPage;

!json_pages ? listLandingPage = [] : listLandingPage = JSON.parse(json_pages);


const getHtml = (req, res) => {
    // res.render('get-html', {
    //     listLandingPage        
    // });
    res.json(listLandingPage);
}

const index = (req, res) => {
    res.render('index', {
        title: "My web store"
    })
}

const listOfProducts = (req, res, next) => {
    res.render('products', {
        title: "List of products",
        items: items
    })
}

const newProduct = (req, res, next) => {
    const { newItem } =  req.body;
    items.push({
        id: items.length + 1,
        name: newItem
    });

    res.redirect('/products')
}

const saveHtmlGet = (req, res) => {
    res.render('save-html')
}

const saveHtmlPost = (req, res, next) => {
    const { styles, component, id, name } = req.body;
    if(!id || !styles || !name || !component) {
        res.status(400).send("Entries must have a html and css");
        return;
    }

    // let newLandingPage = {
    //     id,
    //     name,
    //     styles,
    //     component
    // };    
    // listLandingPage.push(newLandingPage);      
    // const json_pages = JSON.stringify(listLandingPage)

    // Buscar la página existente por su ID
    const existingPageIndex = listLandingPage.findIndex(page => page.id === id);

    if (existingPageIndex !== -1) {
        // Si la página existe, actualízala
        listLandingPage[existingPageIndex] = {
            ...listLandingPage[existingPageIndex], // Mantener las propiedades existentes
            ...req.body, // Sobrescribir con las nuevas propiedades del body
            styles,
            component
        };
    } else {
        // Si la página no existe, añádela a la lista
        const newLandingPage = {
            id,
            name,
            styles,
            component
        };
        listLandingPage.push(newLandingPage);
    }

    const json_pages = JSON.stringify(listLandingPage);

    fs.writeFileSync('save-glp.json', json_pages, 'utf-8')
    res.status(200).json({ message: 'HTML guardado exitosamente' });
}

module.exports = {
    index,
    listOfProducts,
    newProduct,
    saveHtmlGet,
    saveHtmlPost,
    getHtml
}