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


let articleById = async(id)=> {
    let obj = await asyncMysql(`SELECT * FROM articles WHERE _id = '${id}'`)
    if (obj.length < 1) return obj
    return obj[0]
}

let updateData = async(req)=>{

    let objArticle = await articleById(req.params.id)

    //console.log('aqui el objeto', objArticle._id)
    let mongoData = req.body.push? {
        id:objArticle._id,
        push:{in:req.body.push},
        set:{title:objArticle.title},
        consoleMsg: 'Update article-Mongo: '
    }:{
        id:objArticle._id,
        set:{title:objArticle.title},
        consoleMsg: 'Update article-Mongo: '
    }

    let sqlData = 
    req.body.description?
    {
        table:'articles',
        parametre:'description',
        value:req.body.description,
        key:'_id',
        consoleMsg:'update article-Mysql description: '
    }:
    req.body.title?
    {
        table:'articles',
        parametre:'title',
        value:req.body.title,
        key:'_id',
        consoleMsg:'update article-Mysql description: '
    }:{}

    let values = {
        params:{
            id:`${req.params.id}`
        },
        body:{
            value:sqlData.value
        }
    } 

    return {sqlData, values, mongoData}
}

/*---------------------------------------------
 |                  ROUTER                    |
 ---------------------------------------------*/

router

/*- READ */
.get('/', (req, res)=>{
    req.query.title ? 
        findMysql(req.query.title, res, {
            table:'articles',
            parametre:'title',
            type: false // false is string type
        }): 
        allMysql(req, res, {
            table:'articles'
        })
})

.get('/:id', async(req, res)=> {
    let objArticle = await articleById(req.params.id)
   // console.log(objArticle)
    let data = {
        jsonFind: {_id: objArticle._id, status:true}, 
        stringSelect: null
    }

    objArticle.length < 1 ? res.send({info:'not found', ok:true, results:objArticle, in:{}}):
    findMongo(res, Article, data, (mongoRes)=>{
        res.send({ok:true, results:objArticle, in:mongoRes})
    })
})

/*- CREATE*/
.post('/', async(req, res)=> {
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})

    let resMongo = await save({
        models:Article,
        data:{
            title:req.body.value[0]
        }
    })

    if (resMongo.err) return res.status(400).json({err:resMongo.err, ok:false})
    
    let resSql = await insert({
        table:'articles',
        params:'_id, title, description',
        value:[
            `${resMongo._id}`,
            req.body.value[0],
            req.body.value[1]
        ]
    })

    if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
    printC('a new article has been created', `title:${req.body.value[0]}, id:${resMongo._id}`)
    res.send({ok:true, insertId:resMongo._id, affectedRows:resSql.affectedRows, in:resMongo})
})

/*- UPDATE */
.put('/:id', async(req, res)=> {
    /*  les diferent donnes necesaires pour faire le changement sont
        stokes dans des json et furnis par updateData(req)      */
    let {values, sqlData, mongoData} = await updateData(req)
    //console.log('l142 put update ::', mongoData)
    isVide(sqlData)? 

    /*  si sqlData est vide il n'y a pas de changement dans mysql 
        donc on va directement à updateMongo                     */
        updateMongo(res, Article, mongoData, (resIn)=>{
            res.send({ok:true, changedRows:0, resIn})
        }) :

    /*  si sqlData n'est pas vide on doit faire deux changement, 
        le changement dans mongo se fait apres celui de mysql     */
        updateMysql(values, res, sqlData, async(changedRows)=>{
            let {mongoData} = await updateData(req)
            //console.log(mongoData)
            updateMongo(res, Article, mongoData, (resIn)=>{
                res.send({ok:true, changedRows, resIn})
            })
        })
})

/*- DELETE */
.delete('/del', async(req, res)=>{
    /*  va effacer reelment touts les document avec status:false 
        dans la collection articles                                */ 
    const results = await Article.deleteMany({ status: false });

    results.err? res.status(400).json({ok:false, err}):
    results.ok != 1 ? res.status(400).json({ok:false, results}):
    res.send({ok:true, info:'all element status off deleted'})
})


.delete('/:id', async(req, res)=> {
    let objArticle = await articleById(req.params.id)
    //console.log('aqui en delete article ',objArticle )
    //  si l'array des valeurs n'est pas si grande on sais qu'il es vide
    if(objArticle.length < 1) return res.send({info:'id not found', ok:true, results:objArticle, affectedRows:0, in:{}})

    let data = {
        _id:objArticle._id,
        table:'articles',
        key:'_id',
        consoleMsg:`delete article _id:${objArticle._id},  mysql affectedRows: `
    }

    //console.log('aqui otro mas d',data)
    /*  ceci va l'effacer dans mysql mais dans mongo va uniquement 
        changer le status à false                                   */
    deleteMongo(res, Article, data, (mongoResults)=>{
        deleteMysql(req, res, data, (sqloResults)=>{
            res.send({ok:true, in:mongoResults, affectedRows:sqloResults})
        })
    })
})

module.exports = router;