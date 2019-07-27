let express = require('express');
let router = express.Router();
let request = require('./request');
let mysql = require('./mysqlConf');

/* User routes */
/*- GET */
router.get('/', (req, res)=> {
    let data ={
        table:'users',
        parametre:'nombre'
    }

    req.query.nombre ? 
        find(req.query.nombre, res, data) :
        all(req, res, data)
})

router.get('/:id', (req, res)=> {
    let data ={
        table:'users',
        parametre:'id_user'
    }
    find(req.params.id, res, data)
})

/*- POST */
router.post('/', (req, res)=> {
    let data = {
        table:'users',
        parametres:'nombre, password, email',
        consoleMsg:'new user: '
    }
    add(req, res, data)
})

/*- PUT */
router.put('/:id', async(req, res)=> {
    let data = {
        table:'users',
        parametre:'password',
        consoleMsg:'update password: '
    }
    update(req, res, data)
})

/*- DELETE */
router.delete('/:id', async(req, res)=> {
    let data ={
        table:'users',
        consoleMsg:'delete user: '
    }
    
    del(req, res, data)
})

module.exports = router;