/********************************************************
    request
*********************************************************
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
    INSERT_ASYNC:(data)=>{
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
    SELECT_ASYNC:(data)=>{
        let table = data.table? data.table : null
        let params = data.params? data.params : null
        let valueClean = data.value? cleen(data.value):null
        if (table==null) return {err:'ERROR: Table unspecified'}
        if(valueClean==null) return  `SELECT * FROM ${table} ${data.where? 'WHERE '+data.where:''} ${data.limit? 'limit '+data.limit : ''}`
        if(params==null) return  `SELECT * FROM ${table} ${data.where? 'WHERE '+data.where:''} ${data.limit? 'limit '+data.limit : ''}`
        let results = 
            data.type == 'String'?
            `SELECT * FROM ${table} WHERE ${params} = '${valueClean}' ${data.where? 'AND '+data.where:''} ${data.limit? 'limit '+data.limit : ''}`:
            data.type == 'Int'?
            `SELECT * FROM ${table} WHERE ${params} = ${valueClean} ${data.where? 'AND '+data.where:''} ${data.limit? 'limit '+data.limit : ''}`:
            data.type? 
            {err:'ERROR: type unknown'}: {err:'ERROR: type unspecified'}
        return results
    },

    UPDATE_ASYNC:(data)=>{
        let table = data.table? data.table : null
        let params = data.params? data.params : null
        let id = data.id? cleen(data.id):null
        let value = data.value? cleen(data.value) : null
        let key = data.key? data.key : null

        if(table==null) return {err:'ERROR: Table unspecified'}
        if(params==null) return {err:'ERROR: params unspecified'}
        if(id==null) return {err:'UPDATE ERROR: id unspecified'}
        if(value==null) return {err:'UPDATE ERROR: value unspecified'}
        if(key==null) return {err:'ERROR: key unspecified'}

        //console.log(table, parametre, id, value, key)
        let results = `
            UPDATE ${table} 
            SET ${table}.${params} = '${value}' 
            WHERE ${table}.${key} = '${id}'`
        //console.log(results)
        return results
    },
    DELETE_ASYNC:(data)=>{
        let table = data.table? data.table : null
        let id = data.id? cleen(data.id):null
        let key = data.key? data.key : null

        if(table==null) return {err:'ERROR: Table unspecified'}
        if(id==null) return {err:'UPDATE ERROR: id unspecified'}
        if(key==null) return {err:'ERROR: key unspecified'}

        return `DELETE FROM ${table} WHERE ${table}.${key} = '${id}'`
    }
 })