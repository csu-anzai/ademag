/********************************************************
    articles
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
*********************************************************
ce code contiens les requetes http apartir du routage user
*********************************************************/

let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Article = require('../assets/mongoDB/models/article')


let updateData =(req)=>{
    let sqlData = 
    req.body.description?
    {
        table:'articles',
        parametre:'description',
        value:req.body.description,
        key:'id_article',
        consoleMsg:'update article-Mysql description: '
    }:
    req.body.title?
    {
        table:'articles',
        parametre:'title',
        value:req.body.title,
        key:'id_article',
        consoleMsg:'update article-Mysql description: '
    }: res.send({ok:true, changedRows:0})

    let values = {
        params:{
            id: req.params.id
        },
        body:{
            value:sqlData.value
        }
    } 

    return {sqlData, values}
}

let articleById = async(id)=> {
    let obj = await asyncMysql(`SELECT * FROM articles WHERE id_article = ${id}`)
    if (obj.length < 1) return obj
    return obj[0]
}

router

.get('/', (req, res)=>{
    req.query.title ? 
        find(req.query.title, res, {
            table:'articles',
            parametre:'title',
            type: false // false is string type
        }): 
        all(req, res, {
            table:'articles'
        })
})

.get('/:id', async(req, res)=> {
    let objArticle = await articleById(req.params.id)

    let data = {
        jsonFind: {_id: objArticle._id, status:true}, 
        stringSelect: null
    }

    objArticle.length < 1 ? res.send({info:'not found', ok:true, results:objArticle, in:{}}):
    findMongo(res, Article, data, (mongoRes)=>{
        res.send({ok:true, results:objArticle, in:mongoRes})
    })
})

.post('/', (req, res)=> {
    if (req.body.values.length < 2) res.status(400).json({err:'il manquent des element', ok:false})

    let data = {
        title: req.body.values[0],
        consoleMsg:'new article-MongoDB created: '
    }

    saveMongo(res, Article, data, (mongoRes)=>{
        let values = {
            body:{
                values:[
                    req.body.values[0], 
                    req.body.values[1],
                    `${mongoRes._id}`
                ]
            }
        }

        add(values, res, {
            table:'articles',
            parametres:'title, description, _id',
            consoleMsg:`new article created _id:${mongoRes._id},  mysql id: `
        })
    })
})

.put('/:id', async(req, res)=> {
    let {values, sqlData} = updateData(req)
    update(values, res, sqlData, async(changedRows)=>{
        let objArticle = await articleById(req.params.id)
        let mongoData = {
            id:objArticle._id,
            push:{in:req.body.push},
            set:req.body.set,
            consoleMsg: 'Update article-Mongo: '
        }
        updateMongo(res, Article, mongoData, (resIn)=>{
            res.send({ok:true, changedRows, resIn})
        })
    })
})

.delete('/del', async(req, res)=>{
    const results = await Article.deleteMany({ status: false });
    
    results.err? res.status(400).json({ok:false, err}):
    results.ok != 1 ? res.status(400).json({ok:false, results}):
    res.send({ok:true, info:'all element status off deleted'})
})

/*- DELETE */
.delete('/:id', async(req, res)=> {
    del(req, res, {
        table:'articles',
        key:'id_article',
        consoleMsg:'delete article-mysql: '
    })
})

module.exports = router;