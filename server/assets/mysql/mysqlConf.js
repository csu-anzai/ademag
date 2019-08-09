/********************************************************
    mysqlConfig
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
*********************************************************
ce module contiens plusieurs fonction en relation a la 
gestio de la base des données sur mysql et on plus la 
connexion, l'idee est fair un peu d'abstraction.
**********************************************************/
const mysql = require('mysql');
const colorC = require('ansi-colors');
let request = require('./request');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ademag",
    port:3306
});

con.connect((err)=>{ 
    err ? console.log(colorC.red(`problème de connection avec la base des données `+colorC.yellow('Mysql ')+ err))
    :     console.log(colorC.blueBright(`Connecté à la base des données `)+colorC.yellow('Mysql'));
});


mysqlQuery = (res, query, next)=>{
    con.query(query, (err, results) =>{
        err ? res.status(400).json({err, ok:false}):(
            next? next(results) : res.json({results, ok:true})
        )
    });
}

asyncMysql = (query)=>{
    return new Promise(resolve => {
        con.query(query, (err, results) =>{
            err ? resolve(err):resolve(results)
        });
    });
}

printY = (consoleMsg, msgConsole)=>{
    console.log(colorC.yellow(consoleMsg),msgConsole);
}

printC= (consoleMsg, msgConsole)=>{
    console.log(colorC.magenta(consoleMsg),msgConsole);
}

printB = (consoleMsg, msgConsole)=>{
    console.log(colorC.blue(consoleMsg),msgConsole);
}

printG = (consoleMsg, msgConsole)=>{
    console.log(colorC.green(consoleMsg),msgConsole);
}

printR = (consoleMsg, msgConsole)=>{
    console.log(colorC.red(consoleMsg),msgConsole);
}

add = async(req, res, data)=>{
    let query = request.ADD(data, req)
    let {code, insertId} = await asyncMysql(query)
    printC(data.consoleMsg, insertId? insertId : code)
    code? res.status(400).send({err:code, ok:false}):
    res.status(200).send({res:insertId, ok:true})
}

update = async(req, res, data)=>{
    let query = request.UPDATE(data, req)
    let {code, changedRows} = await asyncMysql(query)
    printC(data.consoleMsg, changedRows > 0)
    code? res.status(400).send({err:code, ok:false}):
    res.status(200).send({res:changedRows, ok:true})
}

del = async(req, res, data)=>{
    let query = request.DELETE(data, req)
    let {code, affectedRows} = await asyncMysql(query)
    printC(data.consoleMsg, affectedRows > 0)
    code? res.status(400).send({err:code, ok:false}):
    res.status(200).send({res:affectedRows, ok:true})
}

find = (parametre, res, data)=>{
    mysqlQuery(res, request.FIND(data, parametre))
}

all = (req, res, data)=>{
    mysqlQuery(res, request.SELECT_ALL(data))
}

module.exports = {
    asyncMysql, 
    mysqlQuery, 
    add, 
    update, 
    find, 
    del, 
    con
}



