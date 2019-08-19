let express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
const _ = require('underscore');
const Document = require('../assets/mongoDB/models/document')
const mongo = require('../assets/mongoDB/mongoFonction')

//CRUD examnple mongodb

router

.get('/', async(req, res)=>{

    // s'il existe (title, description) dans l'UR il renvoie le resultat de la recherche, dans le cas contraire il renvoie tous les element (status:true) dans la collection
    let results = 
    req.query.title ? 
        await mongo.find({
            models:Document,
            data:{
                jsonFind: {title:req.query.title}, 
                stringSelect: 'title'
            }
        }) : 
    req.query.description ?
        await mongo.find({
            models:Document,
            data:{
                jsonFind: {description:req.query.description}, 
                stringSelect: 'title'
            }
        }) :
    //default
        await mongo.find({
            models:Document,
            data:{
                jsonFind: {status:true}, 
                stringSelect: 'title'
            }
        }) 
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    res.send({info:'', ok:true, results})
})

.get('/:id', async(req, res)=> {
    // recherche un element par son id
    let results = await mongo.find({
        models:Document,
        data:{
            jsonFind: {_id: `${req.params.id}`}, 
            stringSelect: null
        }
    })
    // verifications des errors 
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    //renvoie de resultat
    res.send({info:'', ok:true, results})
})

.post('/', async(req, res)=> {
    // verification de l'obje value, necessaire pour creer le nouvau element
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    // verification de la taille de array value, s'il contiens sufisament des element
    if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})

    let results = await mongo.save({
        models:Document,
        data:{
            title:req.body.value[0],//title
            description:req.body.value[1]//description
        }
    })

    // verifications des errors 
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    // anoncer dans la console
    printC('a new document has been created', `title:${req.body.value[0]}, id:${results._id}`)
    //renvoie de resultat
    res.send({ok:true, insertId:results._id})
})


.put('/:id', async(req, res)=> {
    if(isVide(req.body)) return  res.status(400).json({ok:false, err:'Bad Request'})
    // modification de l'objet do, 
    let results = req.body.value?
    await mongo.modify({
        models:Document,
        id:req.params.id,
        set:{
            doc:req.body.set
        }
    }):undefined

    // verifications des errors 
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    // anoncer dans la console
    printC('a document has been updated id:', req.params.id)
    //renvoie de resultat
    res.send({info:'', ok:true, changedRows:results.nModified})
})


.delete('/:id', async(req, res)=>{
    //verification de params id
    if(isVide(req.params)) return  res.status(400).json({ok:false, err:'Bad Request'})

    //effacer l'element de la collection
    let results = await mongo.remove({
        models:Document,
        id:req.params.id
    })

    // verifications des errors 
    if(results.err) return res.status(400).json({info:'ERROR mongo results', err:results.err, ok:false})
    // anoncer dans la console
    printC('the document was eliminated', `id:${req.params.id} deletedCount:${results.deletedCount}`)
    //renvoie de resultat
    res.send({info:'', ok:true, affectedRows:results.deletedCount})
})


module.exports = router;