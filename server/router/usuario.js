let express = require('express');
const bcrypt = require('bcrypt');
let router = express.Router();
const Usuario = require('../assets/mongoDB/models/user')

router

.get('/', (req, res)=>{
    findM(res, Usuario, {
        jsonFind: {}, 
        stringSelect: 'nombre email role estado google img'
    })
})

.get('/:id', (req, res)=>{
    findM(res, Usuario, {
        jsonFind: {_id: req.params.id}, 
        stringSelect: 'nombre email role estado google img'
    })
})

.post('/', (req, res)=> {
    saveM(res, Usuario, {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
})

module.exports = router;