/********************************************************
    App
*********************************************************
**********************************************************/

const express = require('express');
const routerController = require('./router/routerController');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const {} = require('./assets/assets')

app.use(express.static(__dirname + '/public'))
    .use('/images', express.static('public/images'))
    .use(cors())
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json());

/*
app.use(function (req, res, next) {
    printB(req.method, req.originalUrl)
    next();
});
*/

app.use((error, req, res, next)=> {	
    error instanceof SyntaxError ?	
    res.send({info:'ERROR DETECTED:'+error, error}) : next()
});

routerController.routing(app)
module.exports = app;