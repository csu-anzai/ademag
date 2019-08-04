/********************************************************
    App
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
**********************************************************/

const express = require('express');
const routerController = require('./router/routerController');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const {} = require('./assets/assets')


app.use(express.static(__dirname + '/public'));
app.use('/images', express.static('public/images')); 
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
routerController.routing(app)


module.exports = app;