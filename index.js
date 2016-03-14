var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/products', function(request, response) {
  fs.readFile('products.json', 'utf8', function(err, data) {
    var obj = JSON.parse(data);
    response.locals = { data: obj };
    response.render('products.ejs');
  });
});

app.get('/products/:id', function(request, response) {
  fs.readFile('products.json', 'utf8', function(err, data) {
    var productsParsed = JSON.parse(data);
    var product = productsParsed.products.filter(function(obj) {
      return obj.id == request.params.id;
    });
    if (product.length) {
      product = product[0];
    } else {
      product = null;
    }
    response.locals = { product: product };
    response.render('product.ejs');
  });
});



app.listen(8080);