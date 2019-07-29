const test = require('../test/testHttp')
const uploader = require('./upload')
const article = require('./article')


const routing = (app)=> {

    app.use('/test', test);
    app.use('/upload', uploader);
    app.use('/article', article);

}

module.exports.routing = routing;