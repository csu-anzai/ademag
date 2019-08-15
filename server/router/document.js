let express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
const _ = require('underscore');
const Document = require('../assets/mongoDB/models/document')
const mongo = require('../assets/mongoDB/mongoFonction')

//CRUD examnple mongodb

router

.get('/', async(req, res)=>{
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
    let results = await mongo.find({
        models:Document,
        data:{
            jsonFind: {_id: `${req.params.id}`}, 
            stringSelect: null
        }
    })

    if (results.err) return res.status(400).json({err:results.err, ok:false})
    res.send({info:'', ok:true, results})
})

.post('/', async(req, res)=> {
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})

    let results = await mongo.save({
        models:Document,
        data:{
            title:req.body.value[0],
            description:req.body.value[1]
        }
    })

    if (results.err) return res.status(400).json({err:results.err, ok:false})
    printC('a new document has been created', `title:${req.body.value[0]}, id:${results._id}`)
    res.send({ok:true, insertId:results._id})
})


.put('/:id', async(req, res)=> {
    if(isVide(req.body)) return  res.status(400).json({ok:false, err:'Bad Request'})

    let results = req.body.value?
    await mongo.modify({
        models:Document,
        id:req.params.id,
        set:{
            doc:req.body.set
        }
    }):undefined

    if (results.err) return res.status(400).json({err:results.err, ok:false})
    printC('a document has been updated id:', req.params.id)
    res.send({info:'', ok:true, changedRows:results.nModified})
})


.delete('/:id', async(req, res)=>{
    if(isVide(req.params)) return  res.status(400).json({ok:false, err:'Bad Request'})
    let results = await mongo.remove({
        models:Document,
        id:req.params.id
    })

    if(results.err) return res.status(400).json({info:'ERROR mongo results', err:results.err, ok:false})
    printC('the document was eliminated', `id:${req.params.id} deletedCount:${results.deletedCount}`)
    res.send({info:'', ok:true, affectedRows:results.deletedCount})
})


module.exports = router;