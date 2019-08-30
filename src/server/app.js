/********************************************************
    App
*********************************************************
**********************************************************/

const express = require('express');
const routerController = require('./router/routerController');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const helmet = require('helmet');
const logger = require('morgan');


const {} = require('./assets/assets')
const gzipCompress = (req, res, next)=> {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
}

const errorDetection = (error, req, res, next)=> {	
    error instanceof SyntaxError ?	
    res.send({info:'ERROR DETECTED:'+error, error}) : next()
}

app 
    .get('*.js', gzipCompress)
    .use(express.static(__dirname + '/public'))
    .use(express.static(__dirname + '/public/site'))
    .use('/images', express.static('public/images'))
    .use(cors({credentials: true,  origin: 'http://localhost:4000'}))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(helmet())
    //.use(logger('dev'))
    .set('trust proxy', 1) 
    .use(errorDetection)

    sessionConf(app)
    routerController.routing(app)

app
    .get('/', (req, res)=>{
        console.log('envoie index')
        res.sendFile(__dirname + '/public/site/index.html');
    })
    .get('/*', function(req, res) {
        res.sendFile(__dirname + '/public/site/index.html');
    })





module.exports = app;