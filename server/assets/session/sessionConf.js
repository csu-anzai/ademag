const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


sessionConf = (app)=> {
    var options = {
        host: "localhost",
        user: "root",
        password: "",
        database: "ademag",
        port:3306
    };
    
    var sessionStore = new MySQLStore(options);
    
    app.use(session({
        key: 'Aqui va el nombre de la key',
        secret: 'AQUI hay que Modificar la secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie  : { 
            //secure:true,
            expires : new Date(Date.now() + (60 * 1000 * 10)),
            rolling:true
        }
    }))

    app.use(function (req, res, next) {
        req.session.touch()
        printB(`${req.method} ${req.originalUrl}`, req.session.id)
        next();
    });

    app.post('/sessions', (req, res) => {
        sessionStore.all((err, session)=>{
            err ? console.log(err) : res.json({session:session})
        })
    })
    
    app.post('/storeGet', (req, res) => {
        let sid = req.body.id
        sessionStore.get(sid, (err, session)=>{
            err ? console.log(err) : res.json({session:session})
        })
    })

    app.post('/storeClear', (req, res) => {
        let sid = req.body.id
        sessionStore.clear(sid, (err, session)=>{
            err ? console.log(err) : res.json({session:session})
        })
    })
}

module.exports = {sessionConf}