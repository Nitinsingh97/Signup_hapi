var fscontroller=require('../controller/cn');

var ap= require("/home/vvdn/Desktop/Signup/app");
var server = ap.server;

//  app.post('/signup', fscontroller.signup) ;
//  app.get('/email_verification', fscontroller.email_verification) ;
// //  app.get('/signout', fscontroller.signout) ;
// //  app.get('/edit', fscontroller.edit) ;
// //  app.get('/deactivate', fscontroller.deactivate) ;
// }

exports.routeApis = function (server){
server.route({
    method:"POST",
    path:"/signup",
    handler : fscontroller.signup
});
server.route({
    method:"GET",
    path:"/email_verification",
    handler : fscontroller.email_verification
});

 }