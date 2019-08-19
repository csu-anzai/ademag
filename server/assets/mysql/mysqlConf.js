/********************************************************
    mysqlConfig
*********************************************************
*********************************************************
ce module contiens plusieurs fonction en relation a la 
gestio de la base des données sur mysql et on plus la 
connexion, l'idee est fair un peu d'abstraction.
**********************************************************/
const mysql = require('mysql');
const colorC = require('ansi-colors');
let request = require('./request');

/*
const con = mysql.createConnection({
    host: "localhost",
    user: "andres",
    password: "cJpMr&(8LcR)6AvC8*",
    database: "ademag",
    port:3306
});
*/

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ademag",
    port:3306
});

/*
const con = mysql.createConnection({
    host: "remotemysql.com",
    user: "FlufayKfhP",
    password: "2M65cyJaUF",
    database: "FlufayKfhP",
    port:3306
});
*/

con.connect((err)=>{ 
    err ? console.log(colorC.red(`problème de connection avec la base des données `+colorC.yellow('Mysql ')+ err))
    :     console.log(colorC.blueBright(`Connecté à la base des données `)+colorC.yellow('Mysql'));
});

asyncMysql = (query)=>{
    return new Promise(resolve => {
        con.query(query, (err, results) =>{
            err ? resolve(err):resolve(results)
        })
    })
}

module.exports = {
    asyncMysql, 
    con
}



