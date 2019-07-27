/********************************************************
    App
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
**********************************************************/

const express = require('express');
const upload = require('./router/upload')
const routerController = require('./router/routerController')
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser')


app.use(express.static(__dirname + '/public'));
app.use('/images', express.static('public/images')); 
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


upload.routing(app) 
routerController.routing(app)


app.use((error, req, res, next)=> {
    if (error instanceof SyntaxError) {
      res.send('requette mal ecris, ou de merde :'+error);
    } else {
      next();
    }
});

module.exports = app;