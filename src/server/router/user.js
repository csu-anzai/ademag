/********************************************************
    user
*********************************************************
ce code contiens les requetes http apartir du routage user
*********************************************************/

let express = require('express');
let router = express.Router();
const mysql = require('../assets/mysql/mysqFonction')

/********************************************************
                    REDACTEUR
*********************************************************/
router
/* 1) Liste des redacteurs */
.get('/redacteurs', async(req, res)=>{
    // si l'objet nom existe dans la query, renvoie le resultat d'une recherche avec ce nom
    let resSql = req.query.nom ?
        await mysql.select({
            table:'redacteurs',
            params:'nom',
            value:req.query.nom,
            type:'String'
        }):
   //si il y aucune object fournis dans la query renvoie toutes les elment de la table contacts
        await mysql.select({
            table:'redacteurs',
        })
   // envoyer la reponse au client
   if (resSql.length < 1) return res.send("No data inside database")
   if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
   if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})
   res.send({ok:true, resSql})
})

/* 2) Redacteur by ID */
.get('/redacteurs/:id', async(req, res)=>{
    let resSqlTT = await mysql.select({
        table:'redacteurs',
        params:'id',
        value:req.params.id,
        type:'String',
        limit:1
    })
    if (resSqlTT.err) return res.status(400).json({err:resSqlTT.err, ok:false})
    if (resSqlTT.code) return res.status(400).json({err:reresSqlTTsults.code, ok:false})
    res.send({ok:true, resSqlTT})})

/*- 3) POST Créer un redacteur */
.post('/redacteurs', async (req, res)=> {
    // verifier s'il existe l'objet value dans le corp, sino renvoie une reponse d'error au client
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})
    
    let results = await mysql.insert({
        table:'redacteurs',
        params:'id_contact,username, email, pass',
        value:[
            req.body.value[0],//id_contact
            req.body.value[1],// username
            req.body.value[2],// email
            req.body.value[3] // pass
        ]
    })
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    printC('a new user objet has been created id:', results.insertId)
    res.send({ok:true, insertId:results.insertId})
    // Syntaxe postman: {"value":["1","Nom_redacteur","redacteur@Compte.com","redac_pass"]}
})

/*-4) PUT LOGIN Redacteur */
.put('/redacteurs', async(req, res)=>{
    let resultsT = 
        req.body.username ? 
            await mysql.select({
                table:'redacteurs',
                params:'username',
                value:req.query.name,
                type:'String',
                limit:1
            }):
        req.body.email ? 
            await mysql.select({
                table:'redacteurs',
                params:'email',
                value:req.query.email,
                type:'String',
                limit:1
            }):undefined
    
    if (resultsT.length < 1) return res.send({info:'this user has not been found', err:'user not found'})
    
    let results = resultsT[0]
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    if (!req.body.password) return res.send({info:'password not found', ok:false})
    
    if (results.pass.localeCompare(req.body.password) == 0){
        printC('user conected username:', results.username)
        res.send({ok:true, connect:true, info:'successful connection'})
    }else  res.send({ok:true, connect:false, info:'Incorrect password'})
    // postman syntaxe pour connection: { "username":[".."],"password":[".."] }
})
/*5) Modifier informations redacteur*/
.put('/redacteurs/restorePassword', async(req, res)=> {
    let results = 
        req.body.username ? 
            await mysql.select({
                table:'redacteurs',
                params:'username',
                value:req.query.name,
                type:'String',
                limit:1
            }):
        req.body.email ? 
            await mysql.select({
                table:'redacteurs',
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
        params:'pass',
        value:req.body.newPassword,
        key:'id'
    }):false

    if (updatePassword.err) return res.status(400).json({info:'value ERROR', err:updatePassword.err, ok:false})
    if (updatePassword.code) return res.status(400).json({info:'value ERROR', err:updatePassword.code, ok:false})
    printC('the test object has been updated affectedRows:', updatePassword.affectedRows)
    res.send({ok:true, changedRows:updatePassword.changedRows})
})


/********************************************************
                    LECTEUR
*********************************************************/


/*6)  Liste des lecteurs */
.get('/lecteurs', async(req, res)=>{
    // si l'objet nom existe dans la query, renvoie le resultat d'une recherche avec ce nom
    let resSql = req.query.nom ?
        await mysql.select({
            table:'lecteurs',
            params:'nom',
            value:req.query.nom,
            type:'String'
        }):
   //si il y aucune object fournis dans la query renvoie toutes les elment de la table contacts
        await mysql.select({
            table:'lecteurs',
        })
   // envoyer la reponse au client
   if (resSql.length < 1) return res.send("No data inside database")
   if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
   if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})
   res.send({ok:true, resSql})
})

/*7) Lecteurs by ID */
.get('/lecteurs/:id', async(req, res)=>{
    let resSqlTT = await mysql.select({
        table:'lecteurs',
        params:'id',
        value:req.params.id,
        type:'String',
        limit:1
    })
    if (resSqlTT.err) return res.status(400).json({err:resSqlTT.err, ok:false})
    if (resSqlTT.code) return res.status(400).json({err:reresSqlTTsults.code, ok:false})
    res.send({ok:true, resSqlTT})})

/*-8) POST Créer un Lecteur */
.post('/lecteurs', async (req, res)=> {
    // verifier s'il existe l'objet value dans le corp, sino renvoie une reponse d'error au client
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})
    
    let results = await mysql.insert({
        table:'lecteurs',
        params:'id_contact,username, email, pass',
        value:[
            req.body.value[0],//id_contact
            req.body.value[1],// username
            req.body.value[2],// email
            req.body.value[3] // pass
        ]
    })
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    printC('a new user objet has been created id:', results.insertId)
    res.send({ok:true, insertId:results.insertId})
    // Syntaxe postman: {"value":["2","nom_lecteur","lecteur@Compte.com","lecteur_pass"]}
})

/*-9) PUT LOGIN Lecteur */
.put('/lecteurs', async(req, res)=>{
    let resultsT = 
        req.body.username ? 
            await mysql.select({
                table:'lecteurs',
                params:'username',
                value:req.query.name,
                type:'String',
                limit:1
            }):
        req.body.email ? 
            await mysql.select({
                table:'lecteurs',
                params:'email',
                value:req.query.email,
                type:'String',
                limit:1
            }):undefined
    
    if (resultsT.length < 1) return res.send({info:'this user has not been found', err:'user not found'})
    
    let results = resultsT[0]
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    if (!req.body.password) return res.send({info:'password not found', ok:false})
    
    if (results.pass.localeCompare(req.body.password) == 0){
        printC('user conected username:', results.username)
        res.send({ok:true, connect:true, info:'successful connection'})
    }else  res.send({ok:true, connect:false, info:'Incorrect password'})
    // postman syntaxe pour connection: { "username":["birthdate"],"password":["oui"] }
})
/*10) Modifier informations redacteur*/
.put('/lecteurs/restorePassword', async(req, res)=> {
    let results = 
        req.body.username ? 
            await mysql.select({
                table:'lecteurs',
                params:'username',
                value:req.query.name,
                type:'String',
                limit:1
            }):
        req.body.email ? 
            await mysql.select({
                table:'lecteurs',
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
        params:'pass',
        value:req.body.newPassword,
        key:'id'
    }):false

    if (updatePassword.err) return res.status(400).json({info:'value ERROR', err:updatePassword.err, ok:false})
    if (updatePassword.code) return res.status(400).json({info:'value ERROR', err:updatePassword.code, ok:false})
    printC('the test object has been updated affectedRows:', updatePassword.affectedRows)
    res.send({ok:true, changedRows:updatePassword.changedRows})
})

module.exports = router;


/* REDACTEURS
1) Liste des redacteurs
2) Redacteur by ID
3) Créer un redacteur
4) Login redacteur
5) Modifier informations redacteur
LECTEURS
6) Liste des lecteurs
7) Lecteurs by ID
8) POST Créer un Lecteur
9) PUT LOGIN Lecteurs
10) Modifier informations redacteur
*/