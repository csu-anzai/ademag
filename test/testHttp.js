/********************************************************
    test
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
    findMysql(req.query.name, res, {
            table:'test',
            parametre:'name',
            type: false // false is string
        }) :
    req.query.value ? 
    findMysql(req.query.email, res, {
            table:'test',
            parametre:'value',
            type: false // false is string
        }) :
    //default    
        allMysql(req, res, {
            table:'test'
        })
})

.get('/:id', (req, res)=> {
    findMysql(req.params.id, res, {
        table:'test',
        parametre:'id_test',
        type: true // true is integer
    })
})

/*- POST */
.post('/', (req, res)=> {
    saveMysql(req, res, {
        table:'test',
        parametres:'name, value',
        consoleMsg:'new test data: '
    })
})

/*- PUT */
.put('/:id', async(req, res)=> {
    updateMysql(req, res, {
        table:'test',
        parametre:'value',
        key:'id_test',
        consoleMsg:'update value test data: '
    })
})

/*- DELETE */
.delete('/:id', async(req, res)=> {
    deleteMysql(req, res, {
        table:'test',
        key:'id_test',
        consoleMsg:'delete test data: '
    })
})

module.exports = router;