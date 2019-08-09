const colorC = require('ansi-colors');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const server = require('../server/app');

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

const CRUDTest =(urlAD, data)=>{
    var id = 0
    describe(`# test GET /${urlAD}`, () => {
        it(`# test GET /${urlAD}`, async () => {
            console.log(`\n-----------API ${urlAD}------------\n`)
            const res = await chai.request(server)
                .get('/'+urlAD)
            if(res.status < 400){
                chai.expect(res.body.ok).to.true
                console.log(`#/${urlAD}-1 ${colorC.blue('GET')} ${urlAD} is ok ::: status code: ${colorC.green(res.status)}`)
            }else {
                console.log(`# ${colorC.red(`/${urlAD}-1 GET ${urlAD} not found `)}::: status code: ${colorC.green(res.status)}`)
                chai.expect(res.body[0], `la rute nexiste pas ::: status code ${colorC.green(res.status)}`).to.exist
            }
        }).timeout(0); 
    })

    describe(`# test POST /${urlAD}`, () => {
        it(`# test POST /${urlAD}`, async () => {
            const res = await chai.request(server)
                .post('/'+urlAD)
                .send({
                    values:data.createValues
                 })
            if(res.status < 400){
                chai.expect(res.body.ok).to.true
                console.log(`#/${urlAD}-2 ${colorC.blue('POST')} /${urlAD}/ is ok ::: status code: ${colorC.green(res.status)} new test data: ${res.body.res}`)
            }else{
                console.log(`# ${colorC.red(`/${urlAD}-2 POST /${urlAD} not found `)}::: status code: ${colorC.green(res.status)}`)
                chai.expect(res.body.res, `la rute nexiste pas ::: status code ${colorC.green(res.status)}`).to.exist
            }
        }).timeout(0); 
    })

    describe(`# test GET /${urlAD}/:id`, () => {
        it(`# test GET /${urlAD}/:id`, async () => {
            const res = await chai.request(server)
                .get(`/${urlAD}/?${data.UpdateParametre}=${data.createValues[0]}`)
            chai.expect(res.body.results, `la rute nexiste pas ::: status code ${colorC.green(res.status)}`).to.exist
            let resID = res.body.results
            id = resID[resID.length -1][data.PrimaryKey]
            chai.expect(res.status, 'HTTP request error, status code '+res.status).equal(200)
            chai.expect(resID[resID.length -1][data.PrimaryKey]).to.exist
            chai.expect(res.body.ok).to.true
            //console.log(`#8.2 ${colorC.blue('GET')} /${urlAD}/${id} is ok ::: status code: ${colorC.green(res.status)} resultat: ${jsonToString(resID[resID.length -1])}`)
        }).timeout(0); 
    })

    describe(`# test PUT /${urlAD}`, () => {
        it(`# test PUT /${urlAD}`, async () => {
            const res = await chai.request(server)
                .put(`/${urlAD}/${id}`)
                .send({
                    value:'new value',
                    set:{role:'New ROLE'}
                })
            if(res.status < 400){
                chai.expect(res.body.ok).to.true
                console.log(`#/${urlAD}-3 ${colorC.blue('PUT')} ${urlAD}/${id} is ok ::: status code: ${colorC.green(res.status)} changedRows: ${res.body.res}`)
            }else{
                console.log(`# ${colorC.red(`/${urlAD}-3 PUT ${urlAD}/${id} not found `)}::: status code: ${colorC.green(res.status)}`)
                chai.expect(res.body.res, `la rute nexiste pas ::: status code ${colorC.green(res.status)}`).to.exist
            }    
        }).timeout(0); 
    })

    describe(`# test DELETE /${urlAD}`, () => {
        it(`# test DELETE /${urlAD}`, async () => {
            const res = await chai.request(server)
                .delete(`/${urlAD}/${id}`)
            if(res.status < 400){
                chai.expect(res.body.ok).to.true
                console.log(`#${urlAD}-4 ${colorC.blue('DELETE')} ${urlAD}/${id} is ok ::: status code: ${colorC.green(res.status)} affectedRows: ${res.body.res}`)
            }else{
                console.log(`# ${colorC.red(`${urlAD}-3 DELETE ${urlAD}/${id} not found `)}::: status code: ${colorC.green(res.status)}`)
                chai.expect(res.body.res, `la rute nexiste pas ::: status code ${colorC.green(res.status)}`).to.exist
            }
        }).timeout(0); 
    })

    describe(`# test FINAL /${urlAD}`, () => {
        it(`# test FINAL /${urlAD}`, async () => {
            const res = await chai.request(server)
                .get(`/${urlAD}/${id}`)
            let resID = res.body.results
            chai.expect(res.body.results, `la rute nexiste pas ::: status code ${colorC.green(res.status)}`).to.exist
            chai.expect(res.status, 'HTTP request error, status code '+res.status).equal(200)
            chai.expect(isVide(resID)).to.true
            chai.expect(res.body.ok).to.true
        }).timeout(0); 
    })
}

module.exports = CRUDTest













































