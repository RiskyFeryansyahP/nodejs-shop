var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping');

var product = [ 
    new Product({
        imagePath : 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title : 'Gothic Video Games',
        description : 'Awesome Game!!',
        price : 100
    }),
    new Product({
        imagePath : 'https://ubistatic19-a.akamaihd.net/resource/en-gb/game/news/assassins-creed/ac-origins/acr_keyart_1920x1080-logo_294484.jpg',
        title : 'Assasin Creed Video Games',
        description : 'Awesome Game!!',
        price : 100
    }),
    new Product({
        imagePath : 'http://www.freenoob.com/wp-content/uploads/2015/09/Batman-Arkham-Knight-Game-Free-Download-For-Pc.jpg',
        title : 'Gothic Video Games',
        description : 'Awesome Game!!',
        price : 100
    })
]
var done = 0;
for(var i=0; i< product.length; i++)
{
    product[i].save(function(err, result) {
        done++;
        if(done === product.length)
        {
            exit();
        }
    });
}

function exit()
{
    mongoose.disconnect();
}