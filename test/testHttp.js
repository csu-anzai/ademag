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


/* User routes */
/*- GET */
router

.get('/', (req, res)=>{
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
    //default    
        all(req, res, {
            table:'test'
        })
})

.get('/:id', (req, res)=> {
    find(req.params.id, res, {
        table:'test',
        parametre:'id_test',
        type: true // true is integer
    })
})

/*- POST */
.post('/', (req, res)=> {
    add(req, res, {
        table:'test',
        parametres:'name, value',
        consoleMsg:'new test data: '
    })
})

/*- PUT */
.put('/:id', async(req, res)=> {
    update(req, res, {
        table:'test',
        parametre:'value',
        key:'id_test',
        consoleMsg:'update value test data: '
    })
})

/*- DELETE */
.delete('/:id', async(req, res)=> {
    del(req, res, {
        table:'test',
        key:'id_test',
        consoleMsg:'delete test data: '
    })
})

module.exports = router;