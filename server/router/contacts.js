let express = require('express');
let router = express.Router();
const mysql = require('../assets/mysql/mysqlFonction')

/*---------------------------------------------
 |                  ROUTER /contacts   (users)    |
 ---------------------------------------------*/

 router
 /*- READ */ // Liste des users 
 .get('/', async(req, res)=>{
    let resSql = await mysql.select({
            table:'contacts',
    })
    res.send({ok:true, results:resSql})
 })

/*- READ */ // Liste des contacts by ID
 .get('/:id', async(req, res)=>{
    // renvoie 1 element de la table contact avec le id fournis dans l'URL
    let results = await mysql.select({
        table:'contacts',
        params:'id',
        value:req.params.id,
        type:'String',
        limit:1
    })

    if (results.length < 1) return res.send({info:'it is empty', ok:true, results:results, in:{}})
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    // envoyer la reponse au client
    res.send({info:'', ok:true, results})
})

 /*- CREATE*/
 .post('/',async(req,res)=>{
    // verifier s'il existe l'objet value dans le corp, sino renvoie une reponse d'error au client
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    if (req.body.value.length < 2) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})
    
    let results = await mysql.insert({
        table:'contacts',
        params:'nom, prenom, birthdate, description',
        value:[
            req.body.value[0],// nom
            req.body.value[1],// prenom
            req.body.value[2],// birthdate
            req.body.value[3] // description
        ]
    })

    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})
    printC('a new contact objet has been created id:', results.insertId)
    res.send({ok:true, insertId:results.insertId})
})

/*- UPDATE */
.put('/:id', async(req, res)=>{
    // recherche le id_contact dans la table contacts et garde le resultat dans la variable resSqlTT
    let resSqlTT = await mysql.select({
        table:'contacts',
        params:'id',
        value:req.params.id,
        type:'String',
        limit:1
    })

    // vue que la reponse Mysql est toujours un arrays des element, on prend le premier element de la reponse
    let resSql = resSqlTT[0]

    //verification de la taille, si est plus pettite que 0 on considere que le contact n'existe pas
    if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found`})
    //verification des errors dans la syntaxe de la requete
    if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
    //verifications des errors dans la reponse de la requete mysql
    if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})

    //si l'objet prenom exite dans le corp on modifie son prenom
    let prenom = req.body.prenom? 
        await mysql.update({
            id:`${resSql.id_contact}`,
            table:'contacts',
            params:'prenom',
            value:req.body.prenom,
            key:'id_contact'
        }):false
    if (prenom.err) return res.status(400).json({err:prenom.err, ok:false})
    if (prenom.code) return res.status(400).json({err:prenom.code, ok:false})

    //si l'objet nom exite dans le corp on modifie son nom
    let nom = req.body.nom?
        await mysql.update({
            id:`${resSql.id_contact}`,
            table:'contacts',
            params:'nom',
            value:req.body.nom,
            key:'id_contact'
        }):false 

    if (nom.err) return res.status(400).json({err:nom.err, ok:false})
    if (nom.code) return res.status(400).json({err:nom.code, ok:false})

    // envoyer la reponse au client
    res.send({info:"update contacts",ok:true,prenom:prenom.affectedRows,nom:nom.affectedRows})
})


module.exports = router;