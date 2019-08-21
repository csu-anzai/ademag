let express = require('express');
let router = express.Router();
const mysql = require('../assets/mysql/mysqlFonction')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


var options = {
    host: "localhost",
    user: "root",
    password: "",
    database: "ademag",
    port:3306
};

var sessionStore = new MySQLStore(options);



/* User routes */
/*- GET */
router

.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie  : { expires : new Date(Date.now() + (60 * 1000 * 60)) }
}))

.get('/',(req, res)=>{
    res.send('server OK')
})

.get('/sessions', (req, res) => {
    sessionStore.all((err, session)=>{
        err ? console.log(err) : res.json({session:session})
    })
})

.get('/storeGet', (req, res) => {
    let sid = req.body.id
    sessionStore.get(sid, (err, session)=>{
        err ? console.log(err) : res.json({session:session})
    })
})

.post('/login',(res, req)=>{
    //if(!req.body.surname) return res.send({err:'rien'})

    
    res.send({sessID:req.session.id})
})

module.exports = router;