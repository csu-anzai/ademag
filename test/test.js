
const colorC = require('ansi-colors');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const server = require('../server/app');
const util = require('util');
const request = require('../server/assets/mysql/request')
const Document = require('../server/assets/mongoDB/models/document')
const CRUDTest = require('./detail-test')

chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised)

let res = {
    json:(obj)=>{ console.log(obj)}, 
    send:(obj)=>{console.log(obj)}
}

jsonToString = (obj)=>{
    return (Object.keys(obj).map(function(k) { return obj[k] })).toString()
}


before(async(done) => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------\n');
    done();
});
  
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});


beforeEach(done => {
    //console.log('\n');
    done();
});

afterEach(done => {
    //console.log('\n');
    done();
});

describe('# test', () => {
    /************************************************************/
    describe('# test', () => {
        it('# MongoBD connection', async () => {
            
            let {results, err} = await findMongoAsync(Document, {
                jsonFind: {}, 
                stringSelect: 'nombre email role estado google img'
            })
            chai.expect(err, `MongoDB Error::${err}`).to.not.exist
            chai.expect(results, `MongoDB Error:: results not exist`).to.exist
            console.log('\n------- connection BD test  ------\n')
            console.log('# mongoDB connect is OK')
        }).timeout(0); 
    })

    /************************************************************/
    describe('# test', () => {
        it('# Mysql connection', async () => {
            const result = await asyncMysql('show status like "Connections%"')
            chai.expect(result.code, result.sqlMessage).to.not.exist
            chai.expect(result[0].Variable_name, result).to.exist
            console.log('# mysql connect is OK')
        }).timeout(0); 
    })

    /************************************************************/
    describe('\n\n-------focntion test------\n', () => {
        it('#1 fonction asyncMysq dans mysqlConf', async () => {
            console.log('\n------- Fonctions test  ------\n')
            const result = await asyncMysql('SELECT 1 as n1')
            chai.expect(result[0].n1).to.equal(1)
            console.log('#1 fonction asyncMysql is ok')
        }).timeout(0); 

        it('\n #2 test fonction isVide dans  mysqlConf', (done) => {
            isVide({notVide:'no'})? done(new Error('no found')) :
            (done(), console.log('#2 function isVide is ok'))
        }).timeout(0);

        it('\n #3 test fonction cleen dans util', (done) => {
            cleen('*+/#n1') != 'n1'? done(new Error('no found')) :
            (done(), console.log('#4 function cleen is ok'))
        }).timeout(0);

        it('\n #4 test fonction cleanArray dans util', (done) => {
            let results = cleanArray(['*/n1','n2/-+,','()&n3']) 
            jsonToString(results) != `'n1','n2','n3'` ? done(new Error('no found :'+jsonToString(results))) :
            (done(), console.log('#5 function cleanArray is ok'))
        }).timeout(0);
        
    })

    /************************************************************/
    describe('API ROUTER /test', () => {
        CRUDTest('test', {
            createValues:['test','value'],
            UpdateParametre:'name',
            PrimaryKey:'id_test'
        })
    })

    /************************************************************/
    describe('API ROUTER /article', () => {
        CRUDTest('article', {
            createValues:['title Article','description Article'],
            UpdateParametre:'title',
            PrimaryKey:'_id'
        })
    })

    /************************************************************/
    describe('API ROUTER /user', () => {
        CRUDTest('document', {
            createValues:["title document","description document"],
            UpdateParametre:'title',
            PrimaryKey:'_id'
        })
    })
    
    /*
    describe('API ROUTER /contacts', () => {
        CRUDTest('contacts', {
            createValues:["nom","prenom","email"],
            UpdateParametre:'nom',
            PrimaryKey:'id_contact'

        })
    })
*/
    

    /************************************************************/ 
/*
    describe('API ROUTER /events', () => {
        CRUDTest('events', {
            createValues:['title','description'],
            UpdateParametre:'title',
            PrimaryKey:'id_event'
        })
    })

    /************************************************************/
/*
    describe('API ROUTER /authors', () => {
        CRUDTest('authors', {
            createValues:['name','last_name', 'email', 'address'],
            UpdateParametre:'name',
            PrimaryKey:'id_author'
        })
    })

    /************************************************************/
/*
    describe('API ROUTER /documents', () => {
        CRUDTest('documents', {
            createValues:['title','description'],
            UpdateParametre:'title',
            PrimaryKey:'id_document'
        })
    })
*/

  
})
