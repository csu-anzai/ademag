let request = require('./request');

module.exports = Object.freeze({
    insert:(data)=>{
        return new Promise(async (resolve)=>{
            let query = request.INSERT_ASYNC(data)
            if(query.err) resolve(query)
            let queryResults = await asyncMysql(query)
            resolve(queryResults)
        })
    },
    select:(data)=>{
        return new Promise(async (resolve)=>{
            let query = request.SELECT_ASYNC(data)
            if(query.err) resolve(query)
            let queryResults = await asyncMysql(query)
            resolve(queryResults)
        })
    },
    update:(data)=>{
        return new Promise(async (resolve)=>{
            let query = request.UPDATE_ASYNC(data)
            if(query.err) resolve(query)
            let queryResults = await asyncMysql(query)
            resolve(queryResults)
        })
    },
    eliminate:(data)=>{
        return new Promise(async (resolve)=>{
            let query = request.DELETE_ASYNC(data)
            if(query.err) resolve(query)
            let queryResults = await asyncMysql(query)
            resolve(queryResults)
        })
    }

})