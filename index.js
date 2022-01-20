const fs = require('fs');
const http = require('http');
const url = require('url');

const makeProductHtml = require('./modules/make-product-html');


const overviewTemp = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const productCardTemp = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const productTemp = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);




const server = http.createServer((req, res) => {
    const {query, pathname: path} = url.parse(req.url, true);
    res.writeHead(200, {'Content-type': 'text/html'});

    if (path === '/' || path === '/overview') {
        const productsHtml = dataObj.map((item) => makeProductHtml(item, productCardTemp)).join('\n');
        const overviewHtml = overviewTemp.replace(/{%PRODUCT_CARDS%}/, productsHtml);
        res.end(overviewHtml);
    } else if (path === '/product') {
        const theProduct = dataObj.find((item) => item.id === +query.id);
        if (theProduct) {
            const productHtml = makeProductHtml(theProduct, productTemp);
            res.end(productHtml);
        } else {
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end('<h2>PAGE NOT FINED</h2>');
        }

    } else if (path === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    } else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('<h2>PAGE NOT FINED</h2>');
    }
});

server.listen(8000, '127.0.0.1', () =>{
    console.log(url)
    console.log('Listen !')
});
