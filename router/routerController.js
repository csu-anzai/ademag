const routerUser = require('./users')

const routing = (app)=> {

    app.use('/users', routerUser);

}

module.exports.routing = routing;