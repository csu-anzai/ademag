/********************************************************
    articles
*********************************************************
*********************************************************
ce code contiens les requetes http apartir du routage user
*********************************************************/

let express = require('express');
let router = express.Router();
const article = require('../assets/utilmy/articles')

/*---------------------------------------------
 |                  ROUTER                    |
 ---------------------------------------------*/

router


.use((req, res, next)=>{
    if(req.body.session == 'EM49NzIsasEpD061unupEiihQUr9XCSa') return next()// cette ligne est uniquement pour la phase de developement
    if(req.session.id_user) next()
    else res.status(400).send({err:'it is necessary to be logged', ok:false})
})

/*- READ */
.get('/', (req,res)=>article.find(req, res))
.get('/trash', (req,res)=>article.findTrash(req, res))
.get('/:id', (req, res)=>article.findID(req, res))

/*- CREATE*/
.post('/', (req, res)=>article.add(req, res))

/*- UPDATE */
.put('/restore/:id', (req, res)=>article.statusON(req, res))
.put('/totrash/:id', async(req, res)=>article.statusOff(req, res))
.put('/:id', (req, res)=>article.update(req, res))

/*- DELETE */
.delete('/:id', (req, res)=>article.eliminate(req, res))

module.exports = router;