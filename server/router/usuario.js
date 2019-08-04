let express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
const _ = require('underscore');
const Usuario = require('../assets/mongoDB/models/user')

router

.get('/', (req, res)=>{
    findMongo(res, Usuario, {
        jsonFind: {estado:true}, 
        stringSelect: 'nombre role'
    })
})

.get('/del', (req, res)=>{
    findMongo(res, Usuario, {
        jsonFind: {estado:false}, 
        stringSelect: 'nombre role estado'
    })
})

.get('/:id', (req, res)=> {
    findMongo(res, Usuario,{
        jsonFind: {_id: req.params.id, estado:true}, 
        stringSelect: null
    })
})

.post('/', (req, res)=> {
    saveMongo(res, Usuario, {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
})

.put('/:id', async(req, res)=> {
    if(isVide(req.body)) return  res.json({ok:false, err:'rien a introduire'})

    const results = await Usuario.updateOne(
        { _id: req.params.id},
        {
            $push:{plus:req.body},
            $set:{estado:true}
        }
    );

    if(results.nModified = 0){
        res.json({ok:false})
    }else{
        findMongo(res, Usuario,{
            jsonFind: {_id: req.params.id}, 
            stringSelect: null,
            info:results
        })
    }
})

.delete('/del/', async(req, res)=>{
    const results = await Usuario.deleteMany({ estado: false });

    results.err? res.status(400).json({ok:false, err}):
    results.ok != 1 ? res.status(400).json({ok:false, results}):
    findMongo(res, Usuario, {
        jsonFind: {}, 
        stringSelect: 'nombre estado',
        info:results
    })
})

.delete('/:id', async(req, res)=>{
    const results = await Usuario.updateOne(
        { _id: req.params.id }, 
        {$set:{estado:false}
    });

    if(results.nModified = 0){
        res.json({ok:false})
    }else{
        findMongo(res, Usuario,{
            jsonFind: {_id: req.params.id}, 
            stringSelect: 'nombre role estado',
            info:results
        })
    }
})



module.exports = router;