

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let util = require('util');
let mysql = require('../assets/mysql/mysqlConf')
let request = require('../assets/mysql/request')
let utilmy = require('../assets/utilmy/utilmy')

chai.should();
chai.use(chaiHttp);

/* user object */
let user = {values:['test','value']}
let res = {json:(obj)=>{ console.log(obj)}}

jsonToString = (obj)=>{
    return (Object.keys(obj).map(function(k) { return obj[k] })).toString()
}

before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------\n');
    done();
});
  
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});

beforeEach(done => {
    //console.log('------------------------');
    done();
});



/* asyn test */
describe('# test', () => {

    describe('\n\n-------focntion test------\n', () => {

        it('assertion success', async () => {
            const result = await asyncMysql('SELECT 1 as n1')
            const result2 = await asyncMysql('DELETE FROM test WHERE name = "test"')
            console.log('\n----------------------TEST DES FONCTIONS BASIQUES----------------------------------\n')
            chai.expect(result[0].n1).to.equal(1)
            console.log('#1 asyncMysql is ok')
        }); 

        it('\n #1 test fonction isVide dans  mysqlConf', (done) => {
            isVide({notVide:'no'})? done(new Error('no found')) :
            (done(), console.log('#2 function isVide is ok'))
        }).timeout(0);

        it('\n #2 test fonction mysqlQuery dans  mysqlConf', done => {
            mysqlQuery(res, request.TEST('test msg'),(results)=>{
                results[0].n1 != 1 ? done(new Error('mysqlQuery not foud')):
                (done(), console.log('#3 fonction mysqlQuery is ok'))
            })
        }).timeout(0);

        it('\n #1 test fonction cleen dans util', (done) => {
            cleen('*+/#n1') != 'n1'? done(new Error('no found')) :
            (done(), console.log('#4 function cleen is ok'))
        }).timeout(0);

        it('\n #1 test fonction cleanArray dans util', (done) => {
            let results = cleanArray(['*/n1','n2/-+,','()&n3']) 
            jsonToString(results) != `'n1','n2','n3'` ? done(new Error('no found :'+jsonToString(results))) :
            (done(), console.log('#5 function cleanArray is ok'))
        }).timeout(0);
        
    })

    describe('\n\n-------mysql test------\n', () => {
    
        describe('', () => {
            it('#6 get all test user', done => {
                console.log('\n----------------------TEST DES FONCTIONS MYSQL----------------------------------\n')
                chai.request(server)
                    .get('/test')
                    .end(function (err, res) {
                        if(err || res.statusCode == 400) done(err, res.statusCode);
                        done();
                        console.log('#6 fonction all is ok - get /test status code: %s, number test item: %s',res.statusCode, res.body.length)
                    });
            }).timeout(0);
        })

        describe('', () => {
            it('#7 save "user" record test',(done) => {
                chai.request(server)
                    .post('/test')
                    .send(user)
                    .then(res => {
                        //console.log(res)
                        res.status == 400? done(new Error('fonction add not foud :'+ (res.body.err? res.body.err : {err:': UNDEFINED'} ))) :
                        done()
                        console.log('#7 fonction add is ok - post /test status code: %s, user saved with id: %s',res.statusCode, res.body.res)
                    })
                    .catch(err => {
                        done(err);
                    });
            }).timeout(0);
        })

        describe('', () => {
            it('#8 get user by id url /test/:id', done => {
                chai.request(server)
                .get('/test/find')
                .query({ name: 'test'})
                .end(function (err1, res1) { //
                    err1? done(new Error(`.get('/test/find') NOT FOUND, user test not avaible, ${res1} : ${err1}`)):
                    chai.request(server)
                    .get('/test/'+res1.body[0].id_test)
                    .end(function (err, res) {
                        if(err || res.statusCode == 400) done(err, res.statusCode);
                        if (res.body[0].id_test == res1.body[0].id_test) {
                            done();
                            printC('find user id:', res.body[0].id_test)
                            console.log('#8  fonction find :id is ok - get /test/find/%s - status code: %s, results:%s',res1.body[0].id_test,res.statusCode, util.inspect(res.body[0].id_test, false, null))
                        }else{
                            done(new Error('not foud'));
                            console.log('#8 status code: %s, user incorrect id = %s',res.statusCode, util.inspect(res.body[0].id_test, false, null))
                        }                    
                    });

                });     
            }).timeout(0);
        })

        describe('', () => {
            it('#9 get "user" with query params name:test', done => {
                chai.request(server)
                    .get('/test/find')
                    .query({ name: 'test'})
                    .end(function (err, res) {
                        if(err || res.statusCode == 400) done(err, res.statusCode);
                        if(res.body[0].name == 'test'){
                            done();
                            printC('find user test name:', res.body[0].name)
                            console.log('#9 fonction find params is ok - get /test/find/?name="test" status code: %s, results: %s',res.statusCode, jsonToString(res.body[0]))
                        }else{
                            done(new Error('no found'))
                            console.log('#9 status code: %s, user: %s status: %s',res.statusCode, util.inspect(res.body[0].name, false, null), res.body)
                        }
                    });
            }).timeout(0);
        })

        describe('', () => {
            it('#10 update password user:test to newpassword', done => {
                chai.request(server)
                    .get('/test/find')
                    .query({ name: 'test'})
                    .end(function (err1, res1) { //
                        chai.request(server)
                        .put('/test/update/'+res1.body[0].id_test)
                        .send({ value: 'new Value'})
                        .then(res2 => {
                            res2.body.err? done(new Error(res2.body.err)):
                            res2.statusCode != 200 ? done(new Error('update fail')):
                            chai.request(server)
                            .get('/test/find')
                            .query({ name: 'test'})
                            .end(function (err3, res3) {
                                if(err3 || res3.statusCode == 400) done(err3, res3.statusCode);
                                if(res3.body[0].name == 'test'){
                                    done();
                                    console.log('#10 fonction update is ok - put /test/update status code: %s, user: %s id:%s results: %s',res2.statusCode, util.inspect(res1.body[0].name, false, null), res1.body[0].id_test,  jsonToString(res3.body[0]))
                                }else{
                                    done(new Error('no found'))
                                    console.log('#10 status code: %s, user: %s results: %s',res2.statusCode, util.inspect(res1.body[0].name, false, null), jsonToString(res3.body[0]))
                                }
                            });
                        })
                        .catch(err => {
                            done(err);
                        });
                    });
            }).timeout(0);
        })

        describe('', () => {
            it('#11 delete "user" ', done => {
                chai.request(server)
                .get('/test/find')
                .query({ name: 'test'})
                .end(function (err, res1) { //
                    chai.request(server)
                    .del('/test/'+res1.body[0].id_test)
                    .then(res => {
                        done();
                        console.log('#11 fonction del is ok - delete /test status code: %s, test data delete: %s',res.statusCode, jsonToString(res.body))
                    })
                    .catch(err => {
                        done(err);
                    });
                });           
            }).timeout(0);
        })
    })

    describe('\n\n-------api test------\n', () => {

        it('assertion success', async () => {
            const result = await asyncMysql('SELECT 1 as n1')
            const result2 = await asyncMysql('DELETE FROM articles WHERE title = "article test"')
            console.log('\n----------------------TEST API----------------------------------\n')
            chai.expect(result[0].n1).to.equal(1)
            //console.log('#1 asyncMysql is ok')
        }); 

        describe('', () => {
            it('#12 get all test user', done => {
                chai.request(server)
                    .get('/article')
                    .end(function (err, res) {
                        if(err || res.statusCode == 400) done(err, res.statusCode);
                        done();
                        console.log('#12 GET /article (ALL) is ok - status code: %s, number test item: %s',res.statusCode, res.body.length)
                    });
            }).timeout(0);

        })

        describe('', () => {
            it('#13 create new article',(done) => {
                chai.request(server)
                    .post('/article')
                    .send({values:['article test','description test']})
                    .then(res => {
                        //console.log(res)
                        res.status == 400? done(new Error('fonction add not foud :'+ (res.body.err? res.body.err : {err:': UNDEFINED'} ))) :
                        done()
                        console.log('#13 POST /article is ok - status code: %s, user saved with id: %s',res.statusCode, res.body.res)
                    })
                    .catch(err => {
                        done(err);
                    });
            }).timeout(0);
        })

        describe('', () => {
            it('#14 get article by id url /article/:id', done => {
                chai.request(server)
                .get('/article/find')
                .query({title:'article test'})
                .end(function (err1, res1) { //
                    const id = res1.body[0].id_article
                    err1? done(new Error(`.get('/test/find') NOT FOUND, user test not avaible, ${res1} : ${err1}`)):
                    chai.request(server)
                    .get('/article/'+id)
                    .end(function (err, res) {
                        if(err || res.statusCode !=200) done(err, res.statusCode);
                        const idfind = res.body[0].id_article
                        if (idfind == id) {
                            done();
                            printC('find user id:', idfind)
                            console.log('#14 GET /article/%s is ok - status code: %s, results:%s',id,res.statusCode, util.inspect(res.body[0].title, false, null))
                        }else{
                            done(new Error('not foud'));
                            console.log('#14 status code: %s, user incorrect id = %s',res.statusCode, util.inspect(res.body[0], false, null))
                        }                    
                    });
                });     
            }).timeout(0);
        })

        describe('', () => {
            it('#15 update article PUT /article/update', done => {
                chai.request(server)
                    .get('/article/find')
                    .query({title:'article test'})
                    .end(function (err1, res1) { //
                        chai.request(server)
                        .put('/article/update/'+res1.body[0].id_article)
                        .send({ value: 'new description'})
                        .then(res2 => {
                            res2.body.err? done(new Error(res2.body.err)):
                            res2.statusCode != 200 ? done(new Error('update fail')):
                            chai.request(server)
                            .get('/article/find')
                            .query({ title: 'article test'})
                            .end(function (err3, res3) {
                                if(err3 || res3.statusCode == 400) done(err3, res3.statusCode);
                                if(res3.body[0].title == 'article test'){
                                    done();
                                    console.log('#15 PUT /article/update is ok - status:%s, title:%s id:%s description: %s',res2.statusCode, util.inspect(res1.body[0].title, false, null), res1.body[0].id_article, res3.body[0].description)
                                }else{
                                    done(new Error('no found'))
                                    console.log('#15 status code: %s, user: %s results: %s',res2.statusCode, util.inspect(res1.body[0].name, false, null), jsonToString(res3.body[0]))
                                }
                            });
                        })
                        .catch(err => {
                            done(err);
                        });
                    });
            }).timeout(0);
        })

        describe('', () => {
            it('#16 delete article', done => {
                chai.request(server)
                .get('/article/find')
                .query({title:'article test'})
                .end(function (err, res1) { //
                    chai.request(server)
                    .del('/article/'+res1.body[0].id_article)
                    .then(res => {
                        res.status != 200? done(new Error(res.err? res.err : {err:': UNDEFINED'} )) :(
                        done(),
                        console.log('#16 DELETE /article is ok - status: %s, test data delete: %s',res.statusCode, jsonToString(res.body)))
                    })
                    .catch(err => {
                        done(err);
                    });
                });           
            }).timeout(0);
        })
    })
})

