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
let request = require('../server/assets/mysql/request');
let mysql = require('../server/assets/mysql/mysqlConf');
let utilmy = require('../server/assets/utilmy/utilmy');

/* User routes */
/*- GET */
router.get('/', (req, res)=> {
    all(req, res, {
        table:'test'
    })
})

router.get('/find', (req, res)=>{
    req.query.name ? 
        find(req.query.name, res, {
            table:'test',
            parametre:'name',
            type: false // false is string
        }) :
    req.query.value ? 
        find(req.query.email, res, {
            table:'test',
            parametre:'value',
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
        parametres:'name, value',
        consoleMsg:'new test data: '
    })
})

/*- PUT */
router.put('/update/:id', async(req, res)=> {
    update(req, res, {
        table:'test',
        parametre:'value',
        key:'id_test',
        consoleMsg:'update value test data: '
    })
})

/*- DELETE */
router.delete('/:id', async(req, res)=> {
    del(req, res, {
        table:'test',
        key:'id_test',
        consoleMsg:'delete test data: '
    })
})

module.exports = router;