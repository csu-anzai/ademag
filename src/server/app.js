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

app.use(express.static(__dirname + '/public/site'))
    .use('/images', express.static('public/images'))
    .use(cors({credentials: true,  origin: 'http://localhost:4000'}))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(helmet())
    //.use(logger('dev'))
    .set('trust proxy', 1) 

app.use((error, req, res, next)=> {	
    error instanceof SyntaxError ?	
    res.send({info:'ERROR DETECTED:'+error, error}) : next()
})

app.get('/',(req, res)=>{
    res.sendfile('./public/site/index.html')
})

app.get('/api/getUsername', (req, res) => res.send({ username:'andres'}));

sessionConf(app)

routerController.routing(app)

module.exports = app;