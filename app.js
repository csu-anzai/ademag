/********************************************************
    App
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
**********************************************************/

const express = require('express');
const upload = require('./upload')
const app = express();
var cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser')
const request = require('./request')
var gutil = require('gulp-util');

app.use(express.static(__dirname + '/public'));
app.use('/images', express.static('public/images')); 
app.use(cors())

let con = mysql.createConnection({
    host: "localhost",
    user: "andres",
    password: "Hipermaga66*",
    database: "ademag"
});

con.connect((err)=>{ 
err ? console.log(gutil.colors.red(`problème de connection avec la base des données`)): 
        console.log(gutil.colors.magenta(`Connecté à la base des données`));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

upload.upload(app) //envoie app vers routage de api

  // si apres une requete, mysql renvoie error, juste envoier un message d'error, sino continuer avec le callback next 
  let mysqlQuery = (res, query, next)=>{
    con.query(query, (err, results) =>{
      err ? res.json({err:err}) : next(results)
    });
  }
  
  let isVide = (req)=>{
    return Object.keys(req.body).length === 0 ? true : false
  }

  app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })

  // get test
  app.get('/test', (req, res) => {
    let sqlQuery = request.TEST(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

    // post test
  app.post('/testpost', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.TEST_POST(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  module.exports = app;