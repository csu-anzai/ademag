//ce module contiens toutes les requetes SQL, ceci a fin de simplifier la lecture du code.

module.exports = Object.freeze({

/***ADMIN QUERYS***/
    
    TEST:(data)=>{
        return `SELECT * FROM logs`
    },
    TEST_POST:(data)=>{
        return `SELECT * FROM logs  WHERE id_log = ${data.id}`
    }
 })