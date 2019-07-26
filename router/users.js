const express = require('express');
const router = express.Router();
let mysql = require('mysql');
var gutil = require('gulp-util');

//let connection =  server.dbConnection();
let con = mysql.createConnection({
    host: "37.120.187.69",
    user: "andres",
    password: "Hipermaga66*",
    database: "ademag",
    port:3306
});

con.connect((err)=>{ 
    err ? console.log(gutil.colors.red(`problème de connection avec la base des données`, err))
    :     console.log(gutil.colors.magenta(`Connecté à la base des données`));
});


/* User routes */
/*- GET */
router.get('/', function (req, res) {
    if (req.query.nombre) {
        con.query("SELECT * FROM users WHERE users.nombre = '" + req.query.nombre + "'", function (err, result) {
            if (err) res.send(err)

            res.send(result)
        })
    } else {
        con.query("SELECT * FROM users", function (err, result) {
            if (err) res.send(err)

            res.send(result)
        })
    }
})

router.get('/:id', function (req, res) {
    con.query("SELECT * FROM users WHERE users.id_user =" + req.params.id, function (err, result) {
        if (err) res.send(err)

        res.send(result)
    })
})

/*- POST */
router.post('/', function (req, res) {
    var values = "'" + req.body.nombre + "', '" + req.body.email + "', '" + req.body.password + "'";
    con.query("INSERT INTO users (nombre, email, password) VALUES (" + values + ")", function (err, result) {
        if (err) res.send(err)
        
        res.send(result)
    })
})

/*- PUT */
router.put('/:id', function (req, res) {
    con.query("UPDATE users SET users.email = '"+ req.body.email + "' WHERE users.id_user =" + req.params.id, function (err, result) {
        if (err) res.send(err)

        res.send(result)
    })
})

/*- DELETE */
router.delete('/:id', function (req, res) {
    con.query("DELETE FROM users WHERE users.id_user =" + req.params.id, function (err, resultdelete) {
        if (err) res.send(err)
        con.query("SELECT * FROM users WHERE users.id_user =" + req.params.id, function (err, result) {
            if (err) res.send(err)    
            else if(resul == []) res.send({ok:false, result})
            else res.send({ok:false, result})
        })
    })
})

module.exports = router;