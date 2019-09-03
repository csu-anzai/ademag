/********************************************************
    Upload
*********************************************************
**********************************************************/
let express = require('express');
let router = express.Router();
var multer = require('multer')

/*-------------------------------------------------
|                 MULTER CONFIG                   |
-------------------------------------------------*/

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'server/public/images')
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

    router

    .use((req, res, next)=>{
        if(req.body.session == 'EM49NzIsasEpD061unupEiihQUr9XCSa') return next()// cette ligne est uniquement pour la phase de developement
        if(req.session.id_user) next()
        else res.status(400).send({err:'it is necessary to be logged', ok:false})
    })

    .post('/', function (req, res) {
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
    })

    .get('/test', (req, res)=>{
        res.send('upload ok')
    })

module.exports = router;