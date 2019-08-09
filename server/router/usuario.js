let express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
const _ = require('underscore');
const Usuario = require('../assets/mongoDB/models/user')

jsonToString = (obj)=>{
    return (Object.keys(obj).map(function(k) { return obj[k] })).toString()
}

router

.get('/', (req, res)=>{
    req.query.nombre ? 
    findMongo(res, Usuario, {
        jsonFind: {nombre:req.query.nombre}, 
        stringSelect: 'nombre role'
    }) : 
    req.query.del ?
    findMongo(res, Usuario, {
        jsonFind: {estado:false}, 
        stringSelect: 'nombre role estado'
    }):
    findMongo(res, Usuario, {
        jsonFind: {estado:true}, 
        stringSelect: 'nombre role'
    })
})

.get('/:id', (req, res)=> {
    findMongo(res, Usuario,{
        jsonFind: {_id: req.params.id, estado:true}, 
        stringSelect: null
    })
})

.post('/', (req, res)=> {
    if (req.body.values.length < 4) res.json({err:'il manquent des element', ok:false})
    
    saveMongo(res, Usuario, {
        nombre: req.body.values[0],
        email: req.body.values[1],
        password: req.body.values[2],
        role: req.body.values[3],
        consoleMsg:'new article-MongoDB created: '
    })
})

.put('/:id', async(req, res)=> {
    if(isVide(req.body)) return  res.json({ok:false, err:'body is void'})

    updateMongo(res, Usuario, {
        id: req.params.id,
        objPush: req.body.push,
        objSet: req.body.set,
        consoleMsg:'update-$Set article-MongoDB: '
    })


})

.delete('/:id', async(req, res)=>{
    deleteMongo(res, Usuario, {
        id:req.params.id,
        consoleMsg:'delete article-MongoDB: '
    })
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


module.exports = router;