const test = require('../../test/testHttp');
const uploader = require('./upload');
const article = require('./article');
const document = require('./document');
const contacts = require('./contacts')
const user = require('./user')


const routing = (app)=> {

    app
        .use('/test', test)
        .use('/upload', uploader)
        .use('/article', article)
        .use('/document', document)
        .use('/contacts',contacts)
        .use('/user', user)
}

module.exports.routing = routing;