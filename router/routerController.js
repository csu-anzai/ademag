const test = require('../test/testHttp')
const uploader = require('./upload')


const routing = (app)=> {

    app.use('/test', test);
    app.use('/upload', uploader);

}

module.exports.routing = routing;