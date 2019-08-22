const bcrypt = require('bcrypt');
const _ = require('underscore');
const Article = require('../mongoDB/models/article')
const mysql = require('../mysql/mysqlFonction')
const mongo = require('../mongoDB/mongoFonction')

module.exports = Object.freeze({
    //recherche des articles
    find: async(req,res)=>{
        let user_id = req.session.id_user? req.session.id_user : '0'

        //si l'utilisateur furni le title dans le body, la recherche serait par title 
        //afficherait uniquement les articles avec status true(1)
        let resSql = 
        req.query.title ?
            await mysql.select({
                table:'articles',
                params:'title',
                value:req.query.title,
                type:'String',
                where:'status = "1"'
            }):
        req.query.my?
            await mysql.select({
                table:'articles',
                where:`status = "1" AND id_redacteur = ${user_id}`
            }):
        //dans le cas contraire la recherche retournerait toutes les articles 
        //afficherait uniquement les articles avec status true(1)
        await mysql.select({
            table:'articles',
            where:`status = "1"`
        })
        if (resSql.length < 1) return res.send({info:'it is empty', ok:true, results:resSql, in:{}})
        if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
        if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})
        res.send({info:'', ok:true, results:resSql})
    },
    findTrash: async(req,res)=>{
        let user_id = req.session.id_user? req.session.id_user : '0'

        let resSql = await mysql.select({
            table:'articles',
            where:`status = 0 AND id_redacteur = ${user_id}`
        })
        if (resSql.length < 1) return res.send({info:'it is empty', ok:true, results:resSql, in:{}})
        if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
        if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})
        res.send({info:'', ok:true, results:resSql})
    },
    findID: async(req, res)=>{
        let resSqlTT = await mysql.select({
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
        
    
        let resMongo = await mongo.find({
            models:Article,
            data:{
                jsonFind: {_id: `${resSql._id}`}, 
                stringSelect: null
            }
        })
    
        if (resMongo.err) return res.status(400).json({err:resMongo.err, ok:false})
        res.send({info:'', ok:true, results:resSql, in:resMongo})
    },
    add:async(req, res)=> {
        if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
        if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})
    
        let resMongo = await mongo.save({
            models:Article,
            data:{
                title:req.body.value[0]
            }
        })
    
        if (resMongo.err) return res.status(400).json({err:resMongo.err, ok:false})
        
        let resSql = await mysql.insert({
            table:'articles',
            params:'_id, title, description, id_redacteur',
            value:[
                `${resMongo._id}`,
                req.body.value[0],
                req.body.value[1],
                `${req.session.id_user}`
            ]
        })
    
        if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
        printC('a new article has been created', `title:${req.body.value[0]}, id:${resMongo._id}`)
        res.send({ok:true, insertId:resMongo._id, affectedRows:resSql.affectedRows, in:resMongo})
    },
    update:async(req, res)=>{
        let user_id = req.session.id_user? req.session.id_user : '0'

        let resSqlTT = await mysql.select({
            table:'articles',
            params:'_id',
            value:req.params.id,
            type:'String',
            limit:1,
            where:`status = "1" AND id_redacteur = ${user_id}`
        })

        let resSql = resSqlTT[0]
        if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found or it doesn't belong to you`, ok:false, results:resSqlTT, in:{}})
        if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
        if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})

        let description = req.body.description? 
            await mysql.update({
                id:`${resSql._id}`,
                table:'articles',
                params:'description',
                value:req.body.description,
                key:'_id'
            }):false
        if (description.err) return res.status(400).json({info:'description ERROR', err:description.err, ok:false})
        if (description.code) return res.status(400).json({info:'description ERROR', err:description.code, ok:false})

        let title = req.body.title? 
            await mysql.update({
                id:resSql._id,
                table:'articles',
                params:'title',
                value:req.body.title,
                key:'_id'
            }):false
       if (title.err) return res.status(400).json({info:'title ERROR', err:title.err, ok:false})
       if (title.code) return res.status(400).json({info:'title ERROR', err:title.code, ok:false})
    
       let resSqlTTOK = await mysql.select({
            table:'articles',
            params:'_id',
            value:req.params.id,
            type:'String',
            limit:1,
            where:`status = "1" AND id_redacteur = ${user_id}`
        })

        let resSqlOK = resSqlTTOK[0]
        if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found`, ok:true, results:resSqlTT, in:{}})
        if (resSqlOK.err) return res.status(400).json({err:resSqlOK.err, ok:false})
        if (resSqlOK.code) return res.status(400).json({err:resSqlOK.code, ok:false})

        let pop = req.body.pop?
        await mongo.modify({
            models:Article,
            id:resSqlOK._id,
            set:{
                doc:{},
                in:[]
            }
        }):undefined

        let smash = req.body.smash?
        await mongo.modify({
            models:Article,
            id:resSqlOK._id,
            set:{
                in:req.body.smash
            }
        }):undefined

        let push = req.body.push?
        await mongo.modify({
            models:Article,
            id:resSqlOK._id,
            push:{in:req.body.push},
            set:{}
        }):undefined

        let set = req.body.set?
        await mongo.modify({
            models:Article,
            id:resSqlOK._id,
            set:{
                doc:req.body.set
            }
        }):undefined

        let inUP = await mongo.modify({
            models:Article,
            id:resSqlOK._id,
            set:{
                title:resSqlOK.title,
            }
        })

        let ok = inUP.n > 0 ? true:false

        printC('a article has been updated', `id:${resSqlOK._id}`)
        res.send({
            changedRows:1,
            info:'', 
            ok,
            smash,
            pop,
            push, 
            set,
            inUP,
            description:description.affectedRows, 
            title:title.affectedRows
        })
    },
    eliminate:async(req, res)=>{
        let user_id = req.session.id_user? req.session.id_user : '0'

        let resSqlTTSelect = await mysql.select({
            table:'articles',
            params:'_id',
            value:req.params.id,
            type:'String',
            limit:1,
            where:`status = "1" AND id_redacteur = ${user_id}`
        })

        let resSqlSelect = resSqlTTSelect[0]
        if (resSqlTTSelect.length < 1) return res.send({info:`id: ${req.params.id} not found or it doesn't belong to you`, ok:false, results:resSqlTTSelect, in:{}})
        if (resSqlSelect.err) return res.status(400).json({err:resSqlSelect.err, ok:false})
        if (resSqlSelect.code) return res.status(400).json({err:resSqlSelect.code, ok:false})

        let resSql = await mysql.eliminate({
            id:req.params.id,
            table:'articles',
            key:'_id'
        })

        if (resSql.err) return res.status(400).json({info:'ERROR query', err:resSql.err, ok:false})
        if (resSql.code) return res.status(400).json({info:'ERROR mysql results',err:resSql, ok:false})
    
        let resMongo = await mongo.remove({
            models:Article,
            id:req.params.id
        })

        if (resMongo.err) return res.status(400).json({info:'ERROR mongo results', err:resMongo.err, ok:false})
        printC('the article was eliminated', `id:${req.params.id} deletedCount:${resMongo.deletedCount}`)
        res.send({info:'', ok:true, affectedRows:resSql.affectedRows, in:resMongo})
    },
    statusOff:async(req, res)=>{
        let user_id = req.session.id_user? req.session.id_user : '0'

        let resSqlTT = await mysql.select({
            table:'articles',
            params:'_id',
            value:req.params.id,
            type:'String',
            limit:1,
            where:`status = "1" AND id_redacteur = ${user_id}`
        })
    
        let resSql = resSqlTT[0]
        if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found or it doesn't belong to you `, ok:false, results:resSqlTT, in:{}})
        if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
        if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})

       // console.log('\n----\n', resSql)

        let inUP = await mongo.modify({
            models:Article,
            id:req.params.id,
            set:{
                status:false,
            }
        })

        if (inUP.err) return res.status(400).json({err:inUP.err, ok:false})

        let status = await mysql.update({
            id:req.params.id,
            table:'articles',
            params:'status',
            value:'0fv bc',
            key:'_id'
        })

        if (status.err) return res.status(400).json({info:'title ERROR', err:status.err, ok:false})
        if (status.code) return res.status(400).json({err:status.code, ok:false})
        printC('the article was sent to the trash', `id:${req.params.id}`)
        res.send({info:'', ok:true, affectedRows:status, in:inUP})
    },
    statusON:async(req, res)=>{
        let user_id = req.session.id_user? req.session.id_user : '0'

        let resSqlTT = await mysql.select({
            table:'articles',
            params:'_id',
            value:req.params.id,
            type:'String',
            limit:1,
            where:`status = "0" AND id_redacteur = ${user_id}`
        })
    
        let resSql = resSqlTT[0]
        if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found in trash or it doesn't belong to you`, ok:false, results:resSqlTT, in:{}})
        if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
        if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})

       // console.log('\n----\n', resSql)

        let inUP = await mongo.modify({
            models:Article,
            id:req.params.id,
            set:{
                status:true,
            }
        })

        if (inUP.err) return res.status(400).json({err:inUP.err, ok:false})

        let status = await mysql.update({
            id:req.params.id,
            table:'articles',
            params:'status',
            value:'1',
            key:'_id'
        })

        if (status.err) return res.status(400).json({info:'title ERROR', err:status.err, ok:false})
        if (status.code) return res.status(400).json({err:status.code, ok:false})
        printC('the article has been restored', `id:${req.params.id}`)
        res.send({info:'', ok:true, affectedRows:status, in:inUP})
    }
})

