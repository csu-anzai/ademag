module.exports = Object.freeze({
    find:async(data)=>{
        return new Promise(async(resolve)=>{
            let {results, err} = await findMongoAsync(data.models, data.data)
            err? resolve(err):resolve(results)
        })
    },
    save:async(data)=>{
        return new Promise(async (resolve)=>{
            let element = new data.models (data.data)
            element.save((err, results)=>{
                err? resolve({err:err._message}):resolve(results)
            })
        })
    },
    modify:async(data)=>{
        return new Promise(async (resolve)=>{
    
            let queryData = data.push ? 
            {
                $push:data.push,
                $set:data.set
            }:{
                $set:data.set
            }
        
            const results = await data.models.updateOne(
                { _id: data.id},
                queryData
            )
    
            resolve(results)
        })
    },
    trash:async(data)=>{
        return new Promise(async(resolve)=>{
            let results = await data.models.updateOne(
                { _id: data._id }, 
                {$set:{status:false}
            });
            resolve(results)
        })
    },
    remove:async(data)=>{
        return new Promise(async(resolve)=>{
            const results = await data.models.deleteMany({ _id:data.id });
            results.err? resolve(results.err):
            results? resolve(results):
            resolve({err:'no sale la respuesta'})
        })
    },
    destroyTrash:async(data)=>{
        return new Promise(async(resolve)=>{
            const results = await data.models.deleteMany({status:false});
            err? resolve(err):resolve(results)
        })
    }

})