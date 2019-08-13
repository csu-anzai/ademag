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

createExecute = async(req, res, data, next)=>{
    let query = request.ADD(data, req)
    let {code, insertId} = await asyncMysql(query)
    printC(data.consoleMsg, insertId? insertId : code)
    code? res.status(400).send({err:code, ok:false}):
    next? next(insertId):
    res.status(200).send({insertId, ok:true})
}

saveMysql = async(req, res, data, next)=>{
    !data.table? res.status(400).send({err:'table object has not been specified ', ok:false}) : 
    !req.body.values? res.status(400).send({err:'values object has not been specified ', ok:false}) : 
    createExecute(req, res, data, next)
}

insert = (data)=>{
    return new Promise(async (resolve)=>{
        let query = request.INSERT(data)
        if(query.err) resolve(query)
        else{
            let queryResults = await asyncMysql(query)
            resolve(queryResults)
        }
    })
}

select = (data)=>{
    return new Promise(async (resolve)=>{
        let query = request.SELECT(data)
        if(query.err) resolve(query)
        else{  
            let resSQL = await asyncMysql(query)
            resolve(resSQL)
        }
    })
}

updateExecute = async(req, res, data, next)=>{
    let query = request.UPDATE(data, req)
    let {code, changedRows} = await asyncMysql(query)
    printC(data.consoleMsg, 'changedRows = '+changedRows)
    code? res.status(400).send({err:code, ok:false}):
    next? next(changedRows):
    res.status(200).send({changedRows, ok:true})
}

updateMysql = async(req, res, data, next)=>{
    !data.table? res.status(400).send({err:'table object has not been specified ', ok:false}) : 
    !data.parametre?  res.status(400).send({err:'parametre object has not been specified ', ok:false}) : 
    !req.params.id? res.status(400).send({err:'params.id object has not been specified ', ok:false}) : 
    !req.body.value? res.status(400).send({err:'value object has not been specified ', ok:false}) : 
    !data.key? res.status(400).send({err:'key object has not been specified ', ok:false}) :
    updateExecute(req, res, data, next)
}

update = async(data)=>{
    return new Promise(async (resolve)=>{
        let query = request.UPDATE_ASYNC(data)
        if(query.err) resolve(query)
        else{
            let queryResults = await asyncMysql(query)
            resolve(queryResults)
        }
    })
}

deleteExecute = async(req, res, data, next)=>{
    let query = request.DELETE(data, req)
    let {code, affectedRows} = await asyncMysql(query)
    printC(data.consoleMsg, affectedRows )
    code? res.status(400).send({err:code, ok:false}):
    next? next(affectedRows):
    res.status(200).send({affectedRows, ok:true})
}

deleteMysql = async(req, res, data, next)=>{
    !req.params.id? res.status(400).send({err:'params.id object has not been specified ', ok:false}) : 
    deleteExecute(req, res, data, next)
}

findMysql = (parametre, res, data, next)=>{
    !parametre? res.status(400).send({err:'value parametre object has not been specified ', ok:false}) :
    !data.table? res.status(400).send({err:'table object has not been specified ', ok:false}) : 
    !data.parametre?  res.status(400).send({err:'parametre object has not been specified ', ok:false}) : 
    next? mysqlQuery(res, request.FIND(data, parametre), next):
    mysqlQuery(res, request.FIND(data, parametre))
}

allMysql = (req, res, data, next)=>{
    mysqlQuery(res, request.SELECT_ALL(data), next)
}

module.exports = {
    allMysql,
    asyncMysql, 
    mysqlQuery, 
    saveMysql, 
    updateMysql, 
    findMysql, 
    deleteMysql, 
    insert,
    select,
    con
}



