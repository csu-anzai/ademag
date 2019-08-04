const test = require('../../test/testHttp');
const uploader = require('./upload');
const article = require('./article');
const user = require('./usuario');


const routing = (app)=> {

    app
        .use('/test', test)
        .use('/upload', uploader)
        .use('/article', article)
        .use('/user', user)

}

module.exports.routing = routing;