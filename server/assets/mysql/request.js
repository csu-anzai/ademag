/********************************************************
    request
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
*********************************************************
ce module contiens toutes les requetes SQL, ceci a fin de 
simplifier la lecture du code.
*********************************************************/

const utilmy = require('../utilmy/utilmy')

module.exports = Object.freeze({

/***QUERYS***/
    TEST:()=>{
        return `SELECT 1 as n1`
    },
    SELECT_ALL:(data)=>{
        let table = data.table? data.table : null
        if(table==null) return `ERR`   
        return `
            SELECT * FROM ${data.table}`
    },
    FIND:(data, parametre)=>{
        let table = data.table? data.table : null
        let params = data.parametre? data.parametre : null
        let parametreClean = parametre? cleen(parametre):null
        if (parametreClean==null || table==null || params==null) return `ERR`
        //console.log(table, params, parametreClean)
        let results = data.type ?  
            `SELECT * FROM ${table} WHERE ${table}.${params} = ${parametreClean}` :
            `SELECT * FROM ${table} WHERE ${table}.${params} = '${parametreClean}'`
        //console.log(results)
        return results
    },
    ADD:(data, req)=>{       
        let table = data.table? data.table : null
        let parametres = data.parametres? data.parametres : null
        let valuesClean = req.body.values? cleanArray(req.body.values) : null
        //console.log(table, parametres, valuesClean)
        if (valuesClean==null || table==null || parametres==null) return `ERR`
        let results = `
            INSERT INTO ${data.table} (${data.parametres}) 
            VALUES (${valuesClean.toString()})`
        //console.log(results)
        return results
    },
    UPDATE:(data, req)=>{
        let table = data.table? data.table : null
        let parametre = data.parametre? data.parametre : null
        let id = req.params.id? cleen(req.params.id):null
        let value = req.body.value? cleen(req.body.value) : null
        let key = data.key? data.key : null
        //console.log(table, parametre, id, value, key)
        if (value==null || id==null || parametre==null || table==null || key==null) return `ERR`
        let results = `
            UPDATE ${table} 
            SET ${table}.${parametre} = '${value}' 
            WHERE ${table}.${key} = '${id}'`
        //console.log(results)
        return results
    },
    DELETE:(data, req)=>{
        let id = req.params.id? cleen(req.params.id):null
        if (id === null) return `ERR`
        return `
            DELETE FROM ${data.table} WHERE ${data.table}.${data.key} = '${req.params.id}'`
    },
    INSERT:(data)=>{
        let table = data.table? data.table : null
        let params = data.params? data.params : null
        let valueClean = data.value? cleanArray(data.value).toString() : null
        if (table==null) return {err:'ERROR: Table unspecified'}
        if(valueClean==null) return {err:'ERROR: value[] not found'}
        if(params==null) return {err:'ERROR: params unspecified'}
        let results = `
            INSERT INTO ${table} (${params}) 
            VALUES (${valueClean})`
        //console.log(results)
        return results
    },
    SELECT:(data)=>{
        let table = data.table? data.table : null
        let params = data.params? data.params : null
        let valueClean = data.value? cleen(data.value):null
        if (table==null) return {err:'ERROR: Table unspecified'}
        if(valueClean==null) return  `SELECT * FROM ${table} ${data.limit? 'limit '+data.limit : ''}`
        if(params==null) return  `SELECT * FROM ${table}`
        let results = data.type ?
            `SELECT * FROM ${table} WHERE ${params} = '${valueClean}' ${data.limit? 'limit '+data.limit : ''}`:
            `SELECT * FROM ${table} WHERE ${params} = ${valueClean} ${data.limit? 'limit '+data.limit : ''}`
        return results
    }
 })