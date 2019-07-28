const routerUser = require('../test/testHttp')


const routing = (app)=> {

    app.use('/test', routerUser);

}

module.exports.routing = routing;