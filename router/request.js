//ce module contiens toutes les requetes SQL, ceci a fin de simplifier la lecture du code.

module.exports = Object.freeze({

/***ADMIN QUERYS***/
    
    SELECT_ALL:(data)=>{
        return `
            SELECT * FROM ${data.table}`
    },
    FIND:(data, parametre)=>{
        return `
            SELECT * FROM ${data.table} WHERE ${data.table}.${data.parametre} = ${parametre}`
    },
    ADD:(data, req)=>{
        var values = req.body.values? req.body.values.map(value=> values = `'${value}'`): null
        if (values === null) return `ERR`
        return `
            INSERT INTO ${data.table} (${data.parametres}) 
            VALUES (${values})`
    },
    UPDATE:(data, req)=>{
        let value = req.body.value? req.body.value : null
        if (value === null) return `ERR`
        return `
            UPDATE ${data.table} 
            SET ${data.table}.${data.parametre} = '${value}' 
            WHERE ${data.table}.id_user = ${req.params.id}`
    },
    DELETE:(data, req)=>{
        return `
            DELETE FROM ${data.table} WHERE ${data.table}.id_user = ${req.params.id}`
    }
 })