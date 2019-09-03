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
        let skipV = data.skip?  data.skip : 0
        skipV = Number(skipV);
    
        let limitV = data.limit? data.limit: 0
        limitV = Number(limitV);

        models.find(data.jsonFind, data.stringSelect)
        .skip(skipV)
        .limit(limitV)
        .exec((err, results) => {
            err ? resolve({err}):resolve({results})
        });
    });
}


module.exports = {findMongoAsync, mongoConexion}