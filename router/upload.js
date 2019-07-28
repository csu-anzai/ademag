/********************************************************
    Upload
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
**********************************************************/
let express = require('express');
let router = express.Router();
var multer = require('multer')
let request = require('../mysql/request');
let mysql = require('../mysql/mysqlConf');
let utilmy = require('../utilmy/utilmy');

/*-------------------------------------------------
|                 MULTER CONFIG                   |
-------------------------------------------------*/

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            let random = Math.round(Math.random() * (9000 - 1000) + 1000) 
            const name = `${Date.now()}-${random + file.mimetype.replace('image/', '.')}` // nom du fichie
            const photoName = cb(null, name)
            return photoName
        }
    })

    var upload = multer({ storage: storage }).array('file')
 
    /*---------------------
    |      SERVICES       |
    ---------------------*/

    router.post('/', function (req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log(err)
                return res.status(500).json(err)
                
                // A Multer error occurred when uploading.
            } else if (err) {
                console.log(err)
                return res.status(500).json(err)
                // An unknown error occurred when uploading.
            }
            printG('file upload %s', req.files[0].filename)
            return res.status(200).json({filename: req.files[0].filename})
            // Everything went fine.
        })
    });
    
    router.get('/test', (req, res)=>{
        res.send('upload ok')
    })


module.exports = router;