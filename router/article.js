/********************************************************
    articles
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
*********************************************************
ce code contiens les requetes http apartir du routage user
*********************************************************/

let express = require('express');
let router = express.Router();
let request = require('../assets/mysql/request');
let mysql = require('../assets/mysql/mysqlConf');
let utilmy = require('../assets/utilmy/utilmy');

router.get('/', (req, res)=> {
    all(req, res, {
        table:'articles'
    })
})

router.get('/find', (req, res)=>{
    req.query.title ? 
        find(req.query.title, res, {
            table:'articles',
            parametre:'title',
            type: false // false is string type
        }) : res.status(400).send({err:'PARAMS INCONUE'}) 
})

router.get('/:id', (req, res)=> {
    find(req.params.id, res, {
        table:'articles',
        parametre:'id_article',
        type: true // true is number type
    })
})

router.get('/n/:id', (req, res)=>{
    find(req.params.id, res, {
        table:'subtitle',
        parametre:'id_article',
        type: true // true is number type
    })
})

router.post('/', (req, res)=> {
    add(req, res, {
        table:'articles',
        parametres:'title, description',
        consoleMsg:'new article created: '
    })
})

router.put('/update/:id', async(req, res)=> {
    update(req, res, {
        table:'articles',
        parametre:'description',
        key:'id_article',
        consoleMsg:'update article description: '
    })
})

/*- DELETE */
router.delete('/:id', async(req, res)=> {
    del(req, res, {
        table:'articles',
        key:'id_article',
        consoleMsg:'delete article: '
    })
})


module.exports = router;