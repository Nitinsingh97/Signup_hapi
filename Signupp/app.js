
var Hapi = require('hapi');
var server = new Hapi.Server(3031);
let routes = require("./api/routes");
routes.routeApis(server);
server.start(function () {
    console.log('Server running at:', server.info.uri);
});