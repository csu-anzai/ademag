const mongoose = require('mongoose');
const colorC = require('ansi-colors');


//Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/ademag', {useNewUrlParser: true})
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var mongoConexion = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoConexion.on('error', console.error.bind(console, 'MongoDB connection error:'))
.then(() => console.log(colorC.blueBright(`Connecté à la base des données `+colorC.green(`MongoDB`))))


findMongoAsync = (models, data)=>{
    return new Promise(resolve => {
        let skipV = data.skip || 0;
        skipV = Number(skipV);
    
        let limitV = data.limit || 0;
        limitV = Number(limitV);

        models.find(data.jsonFind, data.stringSelect)
        .skip(skipV)
        .limit(limitV)
        .exec((err, results) => {
            err ? resolve({err}):resolve({results})
        });
    });
}

findMongo = async(res, models, data, next)=>{
    let {results, err} = await findMongoAsync(models, data)
    let rfinal = err? err:results 
    next? next(rfinal):
    err? res.status(400).json({err, ok:false}):
    isVide(results)? res.status(200).json({info:'is vide', ok:true, results}):
    res.json({info: data.info, results, ok:true})
}

saveMongo = async(res, models, data, next)=>{
    if(isVide(data)) return  res.json({ok:false, err:'rien a introduire'})
    
    let element = new models (data)
    element.save((err, results)=>{
        err? res.status(400).json({ok:false, err}):
        next? next(results):(
            printC(data.consoleMsg, results._id),
            res.json({
                ok:true,
                insertId:results._id
            })
        )
    })
}

updateMongo = async(res, models, data, next)=>{
    const results = await models.updateOne(
        { _id: data.id},
        {
            $push:data.push,
            $set:data.set
        }
    )
    printC(data.consoleMsg, results)
    next? next(results):
    res.json({changedRows:results.nModified, ok:true})
}

deleteMongo = async(res, models, data)=>{
    const results = await models.updateOne(
        { _id: data.id }, 
        {$set:{status:false}
    });
    printC(data.consoleMsg, true)
    res.json({affectedRows: results.nModified, ok:true})
}

module.exports = {findMongoAsync, mongoose, saveMongo, findMongo, mongoConexion}