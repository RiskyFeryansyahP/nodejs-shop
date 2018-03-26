var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productChunk = [];
    var chunkSize = 3;
    for(var i=0; i < docs.length; i += chunkSize)
    {
      productChunk.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Express', product : docs });
  })
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if(err)
    {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })
});

router.get('/shopping-cart', function(req, res, next) {
  if(!req.session.cart)
  {
    res.render('shop/shopping-cart', { products : null });
  }
  else
  {
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', { products : cart.generateArray(), totalPrice : cart.totalPrice });
  }
});

router.get('/checkout', function(req, res, next) {
  if (!req.session.cart) 
  {
    res.redirect('/shopping-cart');  
  }
  else
  {
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', { total : cart.totalPrice });
  }
});

module.exports = router;
