let express = require('express');
let router = express.Router();


/*---------------------------------------------
 |                  ROUTER /contacts   (users)    |
 ---------------------------------------------*/

 router
 /*- READ */ // Liste des users 
 .get('/', async(req, res)=>{
     // si l'objet nom existe dans la query, renvoie le resultat d'une recherche avec ce nom
     let resSql = req.query.nom ?
         await select({
             table:'contacts',
             params:'nom',
             value:req.query.nom,
             type:'String'
         }):
    //si il y aucune object fournis dans la query renvoie toutes les elment de la table contacts
         await select({
             table:'contacts',
         })
    
    // envoyer la reponse au client
    res.send(resSql)
 })

/*- READ */ // Liste des users by ID
 .get('/:id', async(req, res)=>{
    // renvoie 1 element de la table contact avec le id fournis dans l'URL
    let resSqlTT = await select({
        table:'contacts',
        params:'id_contact',
        value:req.params.id,
        type:'String',
        limit:1
    })

    // envoyer la reponse au client
    res.send(resSqlTT)
})

 /*- CREATE*/
 .post('/',async(req,res)=>{
     // cree un element dans la table contacts
    let resultats = await insert({
        table:'contacts',
        params:'id_contact, nom, prenom,email',
        value:[
            req.body.value[0],//id_contact
            req.body.value[1],//nom
            req.body.value[2],//prenom
            req.body.value[3]// mail
        ]
    })

    // envoyer la reponse au client
    res.send(resultats);
})

/*- UPDATE */
.put('/:id', async(req, res)=>{
    // recherche le id_contact dans la table contacts et garde le resultat dans la variable resSqlTT
    let resSqlTT = await select({
        table:'contacts',
        params:'id_contact',
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
        await update({
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
        await update({
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