const mysql = require('mysql');
const gutil = require('gulp-util');
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
    err ? console.log(gutil.colors.red(`problème de connection avec la base des données`, err))
    :     console.log(gutil.colors.magenta(`Connecté à la base des données`));
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

printC = (consoleMsg, msgConsole)=>{
    console.log(gutil.colors.magenta(consoleMsg),msgConsole);
}

add = async(req, res, data)=>{
    let query = request.ADD(data, req)
    let {code, insertId} = await asyncMysql(query)
    printC(data.consoleMsg, insertId? insertId : code)
    res.send({err:code, res:insertId})
}

update = async(req, res, data)=>{
    let query = request.UPDATE(data, req)
    let {code, changedRows} = await asyncMysql(query)
    printC(data.consoleMsg, changedRows > 0)
    res.send({err:code, res:changedRows})
}

del = async(req, res, data)=>{
    let query = request.DELETE(data, req)
    let {code, affectedRows} = await asyncMysql(query)
    printC(data.consoleMsg, affectedRows > 0)
    res.send({err:code, res:affectedRows})
}

find = (parametre, res, data)=>{
    mysqlQuery(res, request.FIND(data, parametre))
}

all = (req, res, data)=>{
    mysqlQuery(res, request.SELECT_ALL(data))
}




module.exports.mysql = {asyncMysql, mysqlQuery, add, update, find, del, con}



