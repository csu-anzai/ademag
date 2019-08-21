/********************************************************
    App
*********************************************************
**********************************************************/

const express = require('express');
const session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
const routerController = require('./router/routerController');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const helmet = require('helmet');
const logger = require('morgan');


const {} = require('./assets/assets')

var options = {
    host: "localhost",
    user: "root",
    password: "",
    database: "ademag",
    port:3306
}

var sessionStore = new MySQLStore(options)

app.use(express.static(__dirname + '/public'))
    .use('/images', express.static('public/images'))
    .use(cors())
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(helmet())
    .use(logger('dev'))
    .set('trust proxy', 1) 
    
app.use(session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie  : { expires : new Date(Date.now() + (60 * 1000 * 60)) }
    }));
/*
app.use(function (req, res, next) {
    printB(req.method, req.originalUrl)
    next();
});
*/




app.use((error, req, res, next)=> {	
    error instanceof SyntaxError ?	
    res.send({info:'ERROR DETECTED:'+error, error}) : next()
})

app.get('/sess', (req, res, next) => {
    req.session.name = 'Flavio'
    console.log(req.session.name)
    res.send({id:req.session.id})
})

routerController.routing(app)
module.exports = app;