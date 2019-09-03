/********************************************************
    test
*********************************************************
ce code contiens les requetes http apartir du routage user
*********************************************************/

let express = require('express');
let router = express.Router();
const mysql = require('../src/server/assets/mysql/mysqlFonction')

/* User routes */
/*- GET */
router

.get('/', async(req, res)=>{
    let results = 
        req.query.name ? 
            await mysql.select({
                table:'test',
                params:'name',
                value:req.query.name,
                type:'String'
            }):
        req.query.value ? 
            await mysql.select({
                table:'test',
                params:'value',
                value:req.query.value,
                type:'Int'
            }):
        //default    
            await mysql.select({
                table:'test'
            })

    if (results.length < 1) return res.send({info:'it is empty', ok:true, results:results, in:{}})
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    res.send({info:'', ok:true, results})
})

.get('/:id', async(req, res)=> {
    let results = await mysql.select({
        table:'articles',
        params:'_id',
        value:req.params.id,
        type:'Int',
        limit:1
    })

    let results0 = results[0]
    if (results.length < 1) return res.send({info:`id: ${req.params.id} not found`, ok:true, results:results, in:{}})
    if (results0.err) return res.status(400).json({err:results0.err, ok:false})
    if (results0.code) return res.status(400).json({err:results0.code, ok:false})
    res.send({info:'', ok:true, results:results0})
})

/*- POST */
.post('/', async (req, res)=> {
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})
    
    let results = await mysql.insert({
        table:'test',
        params:'name, value',
        value:[
            req.body.value[0],
            req.body.value[1]
        ]
    })

    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    printC('a new test objet has been created id:', results.insertId)
    res.send({ok:true, insertId:results.insertId})
})

/*- PUT */
.put('/:id', async(req, res)=> {
    let resSqlTT = await mysql.select({
        table:'test',
        params:'id_test',
        value:req.params.id,
        type:'Int',
        limit:1
    })

    let resSql = resSqlTT[0]
    if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found`, ok:true, results:resSqlTT, in:{}})
    if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
    if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})

    let value = req.body.value? 
        await mysql.update({
            id:`${resSql.id_test}`,
            table:'test',
            params:'value',
            value:req.body.value,
            key:'id_test'
        }):false

    if (value.err) return res.status(400).json({info:'value ERROR', err:value.err, ok:false})
    if (value.code) return res.status(400).json({info:'value ERROR', err:value.code, ok:false})
    printC('the test object has been updated affectedRows:', value.affectedRows)
    res.send({ok:true, changedRows:value.changedRows})
})

/*- DELETE */
.delete('/:id', async(req, res)=> {
    let results = await mysql.select({
        table:'test',
        params:'id_test',
        value:req.params.id,
        type:'Int',
        limit:1
    })

    let results0 = results[0]

    if (results.length < 1) return res.send({info:`id: ${req.params.id} not found`, ok:true, results:results, in:{}})
    if (results0.err) return res.status(400).send({info:'eliminated ERROR query', err:results0.err, ok:false})
    if (results0.code) return res.status(400).send({info:'eliminated ERROR Mysql', err:results0.code, ok:false})

    let eliminated = await mysql.eliminate({
        id:`${results0.id_test}`,
        table:'test',
        key:'id_test'
    })
    
    if (eliminated.err) return res.status(400).json({info:'ERROR query', err:eliminated.err, ok:false})
    if (eliminated.code) return res.status(400).json({info:'ERROR mysql results', err:eliminated, ok:false})
    printC('the test object has been deleted affectedRows:', eliminated.affectedRows)
    res.send({info:'', ok:true, affectedRows:eliminated.affectedRows})
})

module.exports = router;