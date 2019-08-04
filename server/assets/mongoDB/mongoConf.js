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

findMongo = async(res, models, data)=>{
    let {results, err} = await findMongoAsync(models, data)
    err? res.status(400).json({err, status:false}):
    isVide(results)? res.status(200).json({info:'is vide', status:true, results}):
    res.json({info: data.info, results, status:true})
}

saveMongo = async(res, models, data)=>{
    if(isVide(req.body)) return  res.json({ok:false, err:'rien a introduire'})
    
    let element = new models (data)
    element.save((err, results)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            user:results
        })
    })
}

module.exports = {findMongoAsync, mongoose, saveMongo, findMongo, mongoConexion}