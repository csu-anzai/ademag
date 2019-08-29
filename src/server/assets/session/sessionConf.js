const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


sessionConf = (app)=> {
    var options = {
        host: "37.120.187.69",
        user: "alex",
        password: "c4pGr&(9LcR)6AvC8*",
        database: "malki",
        port:3306
    };
    
    var sessionStore = new MySQLStore(options);
    
    app.use(session({
        key: 'Aqui va el nombre de la key', // la key est public mais il va mieux la modifier en production
        secret: 'AQUI hay que Modificar la secret', // il faudrait modifier en production et ne jamais plublier
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie  : { 
            //secure:true,
            expires : new Date(Date.now() + (60 * 1000 * 60 * 24)),
            rolling:true
        }
    }))

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