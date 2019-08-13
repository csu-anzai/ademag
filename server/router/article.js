/********************************************************
    articles
*********************************************************
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

/*---------------------------------------------
 |                  ROUTER                    |
 ---------------------------------------------*/

router

/*- READ */
.get('/', async(req, res)=>{
    let resSql = req.query.title ?
        await select({
            table:'articles',
            params:'title',
            value:req.query.title,
            type:'String'
        }):
        await select({
            table:'articles',
        })

    if (resSql.length < 1) return res.send({info:'it is empty', ok:true, results:resSql, in:{}})
    if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
    if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})
    res.send({info:'', ok:true, results:resSql})
})

.get('/:id', async(req, res)=> {
    let resSqlTT = await select({
        table:'articles',
        params:'_id',
        value:req.params.id,
        type:'String',
        limit:1
    })

    let resSql = resSqlTT[0]
    if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found`, ok:true, results:resSqlTT, in:{}})
    if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
    if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})
    

    let resMongo = await find({
        models:Article,
        data:{
            jsonFind: {_id: `${resSql._id}`, status:true}, 
            stringSelect: null
        }
    })

    if (resMongo.err) return res.status(400).json({err:resMongo.err, ok:false})
    res.send({info:'', ok:true, results:resSql, in:resMongo})
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

.put('/:id', async(req, res)=>{

    let resSqlTT = await select({
        table:'articles',
        params:'_id',
        value:req.params.id,
        type:'String',
        limit:1
    })

    let resSql = resSqlTT[0]
    if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found`, ok:true, results:resSqlTT, in:{}})
    if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
    if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})

    let description = req.body.description? 
        await update({
            id:`${resSql._id}`,
            table:'articles',
            params:'description',
            value:req.body.description,
            key:'_id'
        }):false
    if (description.err) return res.status(400).json({info:'description ERROR', err:description.err, ok:false})

    let title = req.body.title? 
        await update({
            id:resSql._id,
            table:'articles',
            params:'title',
            value:req.body.title,
            key:'_id'
        }):false
   if (title.err) return res.status(400).json({info:'title ERROR', err:title.err, ok:false})
        // ici verification avant le changement
   let resSqlTTOK = await select({
        table:'articles',
        params:'_id',
        value:req.params.id,
        type:'String',
        limit:1
    })

    let resSqlOK = resSqlTTOK[0]
    if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found`, ok:true, results:resSqlTT, in:{}})
    if (resSqlOK.err) return res.status(400).json({err:resSqlOK.err, ok:false})
    if (resSqlOK.code) return res.status(400).json({err:resSqlOK.code, ok:false})

    let inM = req.body.push?
    await modify(Article,{
        id:resSqlOK._id,
        push:{in:req.body.push},
        set:{title:resSqlOK.title}
    }):
    await modify(Article,{
        id:resSqlOK._id,
        set:{title:resSqlOK.title}
    })
    printC('a article has been updated', `id:${resSqlOK._id}`)
    res.send({info:'', ok:true, description:description.affectedRows, title:title.affectedRows, in:inM})
})

/*- DELETE */
.delete('/vide', async(req, res)=>{
    /*  va effacer reelment touts les document avec status:false 
        dans la collection articles                                */ 
    const results = await Article.deleteMany({ status: false });

    results.err? res.status(400).json({ok:false, err}):
    results.ok != 1 ? res.status(400).json({ok:false, results}):
    res.send({ok:true, info:'all element status off deleted'})
})


.delete('/:id', async(req, res)=> {
    let resSqlTT = await select({
        table:'articles',
        params:'_id',
        value:req.params.id,
        type:'String',
        limit:1
    })

    let resSql = resSqlTT[0]
    if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found`, ok:true, results:resSqlTT, in:{}})
    if (resSql.err) return res.status(400).json({info:'ERROR query', err:resSql.err, ok:false})
    if (resSql.code) return res.status(400).json({info:'ERROR mysql results',err:resSql.code, ok:false})

    let objArticle = resSql
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