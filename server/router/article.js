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

//let utilmy = 

router

.get('/', (req, res)=> {
    all(req, res, {
        table:'articles'
    })
})

.get('/find', (req, res)=>{
    req.query.title ? 
        find(req.query.title, res, {
            table:'articles',
            parametre:'title',
            type: false // false is string type
        }) : res.status(400).send({err:'PARAMS INCONUE'}) 
})

.get('/:id', (req, res)=> {
    find(req.params.id, res, {
        table:'articles',
        parametre:'id_article',
        type: true // true is number type
    })
})

.get('/n/:id', (req, res)=>{
    let subtitle = request.FIND({
        table:'subtitle',
        parametre:'id_article',
        type: true // true is number type
    }, req.params.id)

    res.send(subtitle)
    
})

.post('/', (req, res)=> {
    add(req, res, {
        table:'articles',
        parametres:'title, description',
        consoleMsg:'new article created: '
    })
})

.put('/update/:id', async(req, res)=> {
    update(req, res, {
        table:'articles',
        parametre:'description',
        key:'id_article',
        consoleMsg:'update article description: '
    })
})

/*- DELETE */
.delete('/:id', async(req, res)=> {
    del(req, res, {
        table:'articles',
        key:'id_article',
        consoleMsg:'delete article: '
    })
})


module.exports = router;