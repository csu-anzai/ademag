

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let util = require('util');
let mysql = require('../router/mysqlConf')
let request = require('../router/request')

chai.should();
chai.use(chaiHttp);

/* user object */
let user = {values:['test','password', 'mail']}



before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});
  
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});



/* asyn test */
describe('#Asynchronous user crud test', () => {

    it('test fonction isVide dans  mysqlConf', done => {
        isVide({})? done() : done(new Error('no found')) 
        console.log('function isVide: %s', isVide({}))
    }).timeout(0);

    describe('', () => {
        it('#1 get all user', done => {
            chai.request(server)
                .get('/users')
                .end(function (err, res) {
                    if(err) done(err);
    
                    done();
                    console.log('#1 get all user status code: %s, number users item: %s',res.statusCode, res.body.length)
                });
        }).timeout(0);
    })
    
    describe('', () => {
        it('#2 get user by id url /users/1', done => {
            chai.request(server)
                .get('/users/1')
                .end(function (err, res) {
                    if(err) done(err);
                    if (res.body[0].id_user == 1) {
                        done();
                        console.log('#2 status code: %s, correct user: %s id:%s',res.statusCode, res.body[0].nombre, util.inspect(res.body[0].id_user, false, null))
                    }else{
                        done(new Error('not foud'));
                        console.log('#2 status code: %s, user incorrect id = %s',res.statusCode, util.inspect(res.body[0].id_user, false, null))
                    }                    
                });
        }).timeout(0);
    })

    describe('', () => {
        it('#3 save "user" record test', done => {
            chai.request(server)
                .post('/users')
                .send(user)
                .then(res => {
                    done();
                    console.log('#3 status code: %s, user saved with id: %s',res.statusCode, res.body.res)
                })
                .catch(err => {
                    done(err);
                });
        }).timeout(0);
    })


    describe('', () => {
        it('#4 get "user" with query params nombre:test', done => {
            chai.request(server)
                .get('/users/find')
                .query({ nombre: 'test'})
                .end(function (err, res) {
                    if(err) done(err);
                    if(res.body[0].nombre == 'test'){
                        done();
                        console.log('#4 status code: %s, user: %s id:%s',res.statusCode, util.inspect(res.body[0].nombre, false, null), res.body[0].id_user)
                    }else{
                        done(new Error('no found'))
                        console.log('#4 status code: %s, user: %s',res.statusCode, util.inspect(res.body[0].nombre, false, null))
                    }
                });
        }).timeout(0);
    })

    describe('', () => {
        it('#5 update "user" test', done => {

            chai.request(server)
                .get('/users/find')
                .query({ nombre: 'test'})
                .end(function (err, res1) { //
                    chai.request(server)
                    .put('/users/'+res1.body[0].id_user)
                    .send({ email: 'new@test.com'})
                    .then(res2 => {
                        done();
                        console.log('#5 status code: %s, user: %s id:%s status %s',res2.statusCode, res1.body[0].nombre, res1.body[0].id_user, util.inspect(res2.body, false, null))
                    })
                    .catch(err => {
                        done(err);
                    });
                });
        }).timeout(0);
    })

    describe('', () => {

    })

    describe('', () => {

    })


    
})

