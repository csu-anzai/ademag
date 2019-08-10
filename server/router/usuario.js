let express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
const _ = require('underscore');
const Article = require('../assets/mongoDB/models/article')

router

.get('/', (req, res)=>{
    req.query.title ? 
    findMongo(res, Article, {
        jsonFind: {title:req.query.title}, 
        stringSelect: 'title'
    }) : 
    req.query.del ?
    findMongo(res, Article, {
        jsonFind: {status:false}, 
        stringSelect: 'title'
    }):
    findMongo(res, Article, {
        jsonFind: {status:true}, 
        stringSelect: 'title'
    })
})

.get('/:id', (req, res)=> {
    findMongo(res, Article,{
        jsonFind: {_id: req.params.id, status:true}, 
        stringSelect: null
    })
})

.post('/', (req, res)=> {
    if (req.body.values.length < 1) res.status(400).json({err:'il manquent des element', ok:false})
    
    saveMongo(res, Article, {
        title: req.body.values[0],
        consoleMsg:'new article-MongoDB created: '
    })
})


.put('/:id', async(req, res)=> {
    if(isVide(req.body)) return  res.status(400).json({ok:false, err:'Bad Request'})

    updateMongo(res, Article, {
        id: req.params.id,
        push: {in:req.body.push},
        set: req.body.set,
        consoleMsg:'update article-MongoDB: '
    })
})


.delete('/:id', async(req, res)=>{
    if(isVide(req.params)) return  res.status(400).json({ok:false, err:'Bad Request'})
    deleteMongo(res, Article, {
        id:req.params.id,
        consoleMsg:'delete article-MongoDB: '
    })
})


/*
.delete('/del/', async(req, res)=>{
    const results = await Article.deleteMany({ status: false });
    
    results.err? res.status(400).json({ok:false, err}):
    results.ok != 1 ? res.status(400).json({ok:false, results}):
    findMongo(res, Article, {
        jsonFind: {}, 
        stringSelect: 'nombre status',
        info:results
    })
})
*/

module.exports = router;