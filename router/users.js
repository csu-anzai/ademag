let express = require('express');
let router = express.Router();
let request = require('./request');
let mysql = require('./mysqlConf');

/* User routes */
/*- GET */
router.get('/', (req, res)=> {
    req.query.nombre ? 
        find(req.query.nombre, res, {
            table:'users',
            parametre:'nombre',
            type: false // false is string
        }) :
    req.query.email ? 
        find(req.query.email, res, {
            table:'users',
            parametre:'email',
            type: false // false is string
        }) :
    req.query.id ? 
        find(req.query.id, res, {
            table:'users',
            parametre:'id_user',
            type: true // false is string
        }) :
    isVide(req.query) ?  
        all(req, res, {
            table:'users'
        }): res.send(`parametre inconu`)
})

router.get('/:id', (req, res)=> {
    find(req.params.id, res, {
        table:'users',
        parametre:'id_user',
        type: true // true is integer
    })
})

/*- POST */
router.post('/', (req, res)=> {
    add(req, res, {
        table:'users',
        parametres:'nombre, password, email',
        consoleMsg:'new user: '
    })
})

/*- PUT */
router.put('/password/:id', async(req, res)=> {
    update(req, res, {
        table:'users',
        parametre:'password',
        key:'id_user',
        consoleMsg:'update password: '
    })
})

/*- DELETE */
router.delete('/:id', async(req, res)=> {
    del(req, res, {
        table:'users',
        key:'id_user',
        consoleMsg:'delete user: '
    })
})

module.exports = router;