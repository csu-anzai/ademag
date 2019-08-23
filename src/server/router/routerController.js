const test = require('../../../test/testHttp');
const uploader = require('./upload');
const article = require('./article');
const document = require('./document');
const contacts = require('./contacts')
const redacteur = require('./redacteur')


const routing = (app)=> {

    app
        .use('/test', test)
        .use('/upload', uploader)
        .use('/article', article)
        .use('/document', document)
        .use('/contacts',contacts)
        .use('/redacteur', redacteur)
}

module.exports.routing = routing;