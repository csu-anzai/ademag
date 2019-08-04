const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ademag', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Mongo Error:', err))



findMongo = (models, data)=>{
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

findM = async(res, models, data)=>{
    let {results, err} = await findMongo(models, data)
    err? res.status(400).json({err, status:false}):
    res.json({results:results, status:true})
}

saveM = async(res, models, data)=>{
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

module.exports = {findMongo, mongoose, saveM, findM}