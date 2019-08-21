/********************************************************
    user
*********************************************************
ce code contiens les requetes http apartir du routage user
*********************************************************/

let express = require('express');
let router = express.Router();
const mysql = require('../assets/mysql/mysqlFonction')

/* User routes */
/*- GET */
router

/*- POST */
.post('/', async (req, res)=> {
    if(req.session.id_user) return res.send({info:'YOUR ARE LOGIN imposible create new user', ok:true})
    // verifier s'il existe l'objet value dans le corp, sino renvoie une reponse d'error au client
    if (!req.body.value) return res.status(400).json({err:`the 'value' parameter has not been specified`, ok:false})
    if (req.body.value.length < 7) return res.status(400).json({err:`missing elements within the parameter 'value'`, ok:false})
    
    let find_username = await mysql.select({
        table:'users_redacteur',
        params:'username',
        value:req.body.value[4],
        type:'String',
        limit:1,
        select:'id_user, id_contact'
    })

    if (find_username.length > 0) return res.send({info:'this username already exists', err:'NOT CREATED'})

    let results_contact = await mysql.insert({
        table:'contacts',
        params:'nom, prenom, birthdate, description',
        value:[
            req.body.value[0],// nom
            req.body.value[1],// prenom
            req.body.value[2],// birthdate
            req.body.value[3] // description
        ]
    })

    if (results_contact.err) return res.status(400).json({err:results_contact.err, ok:false})
    if (results_contact.code) return res.status(400).json({err:results_contact.code, ok:false})
    printC('a new contact objet has been created id:', results_contact.insertId)

    let results_redacteur = await mysql.insert({
        table:'redacteur',
        params:'id_contact, username, email, pass',
        value:[
            `${results_contact.insertId}`, // id_contact
            req.body.value[4], // username
            req.body.value[5], // email
            req.body.value[6]  // pass
        ]
    })
    
    if (results_redacteur.err) return res.status(400).json({err:results_redacteur.err, ok:false})
    if (results_redacteur.code) return res.status(400).json({err:results_redacteur.code, ok:false})
    printC('a new user objet has been created id:', results_redacteur.insertId)

    res.send({info:'USER CREATED', ok:true})
})

/*- PUT */
.put('/login', async(req, res)=>{
    let resultsT = await mysql.select({
        table:'users_redacteur',
        params:'username',
        value:req.body.username,
        type:'String',
        where:`pass = '${req.body.password}'`,
        limit:1,
        select:'id_user, id_contact'
    })

    if (resultsT.length < 1) return res.send({info:'this user has not been found or password is incorrect', err:'NOT LOGIN'})

    let results = resultsT[0]
    if (results.err) return res.status(400).json({err:results.err, ok:false})
    if (results.code) return res.status(400).json({err:results.code, ok:false})

    req.session.id_user ? res.send({info:'déjà login'}):
    req.session.regenerate(function(err) {
        req.session.id_user = results.id_user
        req.session.id_contact = results.id_contact
        res.send({info:'LOGIN OK', ok:true, results})
    })
})

/*- PUT */
.put('/logout', async(req, res)=>{   
    req.session.id_user ?
        req.session.destroy(function(err) {
            res.send({info:'LOGOUT OK', ok:true})
        }):
        res.send({info:'it is necessary to be logged in to log out', ok:false})
})

/*- DELETE */
.delete('/', async(req, res)=> {
    if(!req.session.id_user) return res.send({info:'DELETE IMPOSIBLE FOR NOT LOGIN USER', ok:false})
    //res.send({info:'delete', id_user:req.session.id_user, id_contact:req.session.id_contact})
    let eliminated_user = await mysql.eliminate({
        id:`${req.session.id_user}`,
        table:'redacteur',
        key:'id'
    })

    if (eliminated_user.err) return res.status(400).json({info:'ERROR query', err:eliminated.err, ok:false})
    if (eliminated_user.code) return res.status(400).json({info:'ERROR mysql results', err:eliminated, ok:false})

    printC('the user object has been deleted affectedRows:', eliminated_user.affectedRows)

    let eliminated_contact = await mysql.eliminate({
        id:`${req.session.id_contact}`,
        table:'contacts',
        key:'id'
    })

    if (eliminated_contact.err) return res.status(400).json({info:'ERROR query', err:eliminated.err, ok:false})
    if (eliminated_contact.code) return res.status(400).json({info:'ERROR mysql results', err:eliminated, ok:false})
    
    printC('the contact object has been deleted affectedRows:', eliminated_contact.affectedRows)
   
    req.session.destroy((err)=>{
        res.send({info:'', ok:true, affectedRows:{contacts:eliminated_contact.affectedRows, users:eliminated_user.affectedRows}})
    })
})

module.exports = router;