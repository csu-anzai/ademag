/********************************************************
    test
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
*********************************************************
ce code contiens les requetes http apartir du routage user
*********************************************************/

let express = require('express');
let router = express.Router();
let request = require('../mysql/request');
let mysql = require('../mysql/mysqlConf');
let utilmy = require('../utilmy/util');

/* User routes */
/*- GET */
router.get('/', (req, res)=> {
    all(req, res, {
        table:'test'
    })
})

router.get('/find', (req, res)=>{
    req.query.nombre ? 
    find(req.query.nombre, res, {
        table:'test',
        parametre:'nombre',
        type: false // false is string
    }) :
req.query.email ? 
    find(req.query.email, res, {
        table:'test',
        parametre:'email',
        type: false // false is string
    }) :
req.query.id ? 
    find(req.query.id, res, {
        table:'test',
        parametre:'id_test',
        type: true // false is string
    }) : res.send('parametre inconue') 
})

router.get('/:id', (req, res)=> {
    find(req.params.id, res, {
        table:'test',
        parametre:'id_test',
        type: true // true is integer
    })
})

/*- POST */
router.post('/', (req, res)=> {
    add(req, res, {
        table:'test',
        parametres:'nombre, password, email',
        consoleMsg:'new user: '
    })
})

/*- PUT */
router.put('/update/:id', async(req, res)=> {
    update(req, res, {
        table:'test',
        parametre:'password',
        key:'id_test',
        consoleMsg:'update password: '
    })
})

/*- DELETE */
router.delete('/:id', async(req, res)=> {
    del(req, res, {
        table:'test',
        key:'id_test',
        consoleMsg:'delete user: '
    })
})

module.exports = router;