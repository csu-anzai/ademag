let express = require('express');
let router = express.Router();


/*---------------------------------------------
 |                  ROUTER /contacts   (users)    |
 ---------------------------------------------*/

 router
 /*- READ */ // Liste des users 
 .get('/', async(req, res)=>{
     let resSql = req.query.nom ?
         await select({
             table:'contacts',
             params:'nom',
             value:req.query.nom,
             type:'String'
         }):
         await select({
             table:'contacts',
         })
         res.send(resSql)
 })

/*- READ */ // Liste des users by ID
 .get('/:id', async(req, res)=>{

    let resSqlTT = await select({
        table:'contacts',
        params:'id_contact',
        value:req.params.id,
        type:'String',
        limit:1
    })
    res.send(resSqlTT)
})

 /*- CREATE*/
 .post('/',async(req,res)=>{
    let resultats = await insert({
        table:'contacts',
        params:'id_contact, nom, prenom,email',
        value:[
            req.body.value[0],
            req.body.value[1],
            req.body.value[2],
            req.body.value[3]
        ]
    })
    res.send(resultats);
})
// postman {
//	"value": ["4","dupont","jeanmotdepass","jean@gmail.com"]
// }

/*- UPDATE */
.put('/:id', async(req, res)=>{
    let resSqlTT = await select({
        table:'contacts',
        params:'id_contact',
        value:req.params.id,
        type:'String',
        limit:1
    })
    let resSql = resSqlTT[0]
    if (resSqlTT.length < 1) return res.send({info:`id: ${req.params.id} not found`})
    if (resSql.err) return res.status(400).json({err:resSql.err, ok:false})
    if (resSql.code) return res.status(400).json({err:resSql.code, ok:false})

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
// Postman: PUT {"prenom":"TEST"}

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
    res.send({info:"update contacts",ok:true,prenom:prenom.affectedRows,nom:nom.affectedRows})
  /*
  les deux: {
	"prenom":"TEST",
	"nom":"TestNom"
    }
  */  
})


module.exports = router;