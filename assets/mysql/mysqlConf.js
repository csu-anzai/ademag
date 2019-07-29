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
const c = require('ansi-colors');
let request = require('./request');

//let connection =  server.dbConnection();
const con = mysql.createConnection({
    host: "37.120.187.69",
    user: "andres",
    password: "Hipermaga66*",
    database: "ademag",
    port:3306
});

con.connect((err)=>{ 
    err ? console.log(c.red(`problème de connection avec la base des données`, err))
    :     console.log(c.magenta(`Connecté à la base des données`));
});


mysqlQuery = (res, query, next)=>{
    con.query(query, (err, results) =>{
        err ? res.json({err:err}):(
            next? next(results) : res.send(results)
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
    console.log(c.inverse.yellow(consoleMsg),msgConsole);
}

printC= (consoleMsg, msgConsole)=>{
    console.log(c.bgMagenta(consoleMsg),msgConsole);
}

printB = (consoleMsg, msgConsole)=>{
    console.log(c.inverse.blue(consoleMsg),msgConsole);
}

printG = (consoleMsg, msgConsole)=>{
    console.log(c.inverse.green(consoleMsg),msgConsole);
}

printR = (consoleMsg, msgConsole)=>{
    console.log(c.inverse.red(consoleMsg),msgConsole);
}

add = async(req, res, data)=>{
    let query = request.ADD(data, req)
    let {code, insertId} = await asyncMysql(query)
    printC(data.consoleMsg, insertId? insertId : code)
    code? res.status(400).send({err:code}):
    res.status(200).send({res:insertId})
}

update = async(req, res, data)=>{
    let query = request.UPDATE(data, req)
    let {code, changedRows} = await asyncMysql(query)
    printC(data.consoleMsg, changedRows > 0)
    code? res.status(400).send({err:code}):
    res.status(200).send({res:changedRows})
}

del = async(req, res, data)=>{
    let query = request.DELETE(data, req)
    let {code, affectedRows} = await asyncMysql(query)
    printC(data.consoleMsg, affectedRows > 0)
    code? res.status(400).send({err:code}):
    res.status(200).send({res:affectedRows})
}

find = (parametre, res, data)=>{
    mysqlQuery(res, request.FIND(data, parametre))
}

all = (req, res, data)=>{
    mysqlQuery(res, request.SELECT_ALL(data))
}

module.exports.mysql = {
    asyncMysql, 
    mysqlQuery, 
    add, 
    update, 
    find, 
    del, 
    con
}



