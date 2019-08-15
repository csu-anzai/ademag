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