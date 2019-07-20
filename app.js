/********************************************************
    ADEMAG
*********************************************************
Description:
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
app.use('/Photo', express.static('public/images')); 
app.use(cors())

let con = mysql.createConnection({
    host: "remotemysql.com",
    user: "KHZIJCA4G6",
    password: "YVW43sdafg",
    database: "KHZIJCA4G6"
});

con.connect((err)=>{ 
err ? console.log(gutil.colors.red(`problème de connection avec la base des données`)): 
        console.log(gutil.colors.magenta(`Connecté à la base des données`));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

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
    res.send('Projet 2019 Test')
  })

  // get test
  app.get('/test', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.TEST(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

    // get test
  app.post('/test', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.TEST(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

      // get photo
      app.post('/photo', (req, res) => {
        let sqlQuery = isVide(req) ? '' :request.PHOTO(req.body)
        mysqlQuery(res, sqlQuery, (results)=>{
          res.json({results:results});
        });
      });

  module.exports = app;