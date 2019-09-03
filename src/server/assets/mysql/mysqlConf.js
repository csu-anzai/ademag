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

const con = mysql.createConnection({
    host: "37.120.187.69",
    user: "alex",
    password: "c4pGr&(9LcR)6AvC8*",
    database: "malki",
    port:3306
});

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



