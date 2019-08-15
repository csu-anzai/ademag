/********************************************************
    user
*********************************************************
ce code contiens les requetes http apartir du routage user
*********************************************************/

let express = require('express');
let router = express.Router();
const mysql = require('../assets/mysql/mysqFonction')

/* User routes */
/*- GET */
router

/*- POST */
.post('/', async (req, res)=> {
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})
    
    let results = await mysql.insert({
        table:'user',
        params:'username, email, password',
        value:[
            req.body.value[0],
            req.body.value[1],
            req.body.value[2]
        ]
    })

    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    printC('a new user objet has been created id:', results.insertId)
    res.send({ok:true, insertId:results.insertId})
})

/*- PUT */
.put('/', async(req, res)=>{
    let results = 
        req.body.username ? 
            await mysql.select({
                table:'user',
                params:'username',
                value:req.query.name,
                type:'String',
                limit:1
            }):
        req.body.email ? 
            await mysql.select({
                table:'user',
                params:'email',
                value:req.query.email,
                type:'Srinng',
                limit:1
            }):undefined

    if (results.length < 1) return res.send({info:'this user has not been found', err:'user not found'})
    if (result.err) return res.status(400).json({err:result0.err, ok:false})
    if (result.code) return res.status(400).json({err:result0.code, ok:false})

    let result0 = result[0]
    if (result0) return res.status(400).json({err:'neither any nickname nor any email have been specified', ok:false})

    printC('user conected username:', results.username)
    results0.password == req.body.password ? res.send({ok:true, connect:true, info:'successful connection'}):res.send({ok:true, connect:false, info:'Incorrect password'})
})

.put('/restorePassword', async(req, res)=> {
    let results = 
        req.body.username ? 
            await mysql.select({
                table:'user',
                params:'username',
                value:req.query.name,
                type:'String',
                limit:1
            }):
        req.body.email ? 
            await mysql.select({
                table:'user',
                params:'email',
                value:req.query.email,
                type:'Srinng',
                limit:1
            }):undefined

    if (results.length < 1) return res.send({info:'this user has not been found', err:'user not found'})
    if (result.err) return res.status(400).json({err:result0.err, ok:false})
    if (result.code) return res.status(400).json({err:result0.code, ok:false})

    let result0 = result[0]
    if (result0) return res.status(400).json({err:'neither any nickname nor any email have been specified', ok:false})

    let updatePassword = req.body.newPassword? 
    await mysql.update({
        id:`${result0.id_user}`,
        table:'test',
        params:'password',
        value:req.body.newPassword,
        key:'id_user'
    }):false

    if (updatePassword.err) return res.status(400).json({info:'value ERROR', err:updatePassword.err, ok:false})
    if (updatePassword.code) return res.status(400).json({info:'value ERROR', err:updatePassword.code, ok:false})
    printC('the test object has been updated affectedRows:', updatePassword.affectedRows)
    res.send({ok:true, changedRows:updatePassword.changedRows})
})

module.exports = router;