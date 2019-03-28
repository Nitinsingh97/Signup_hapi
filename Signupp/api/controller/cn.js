let Joi = require('joi');
let bodyParser = require('body-parser');
var dbc = require('../../dbCon');
var poolVar = dbc.pool
var express = require('express');
let app = express();
var nodemailer = require('nodemailer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var url = require('url');
var crypto = require('crypto');
let schema = Joi.object().keys({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  emailverified: Joi.string().regex(/[0-1]$/).max(1)
})

let c ;



module.exports.signup = (request, response) => {
    let a = request.body.fn;
    console.log(request.body);
    let b = request.body.ln;
    c= request.body.email;
    let d = request.body.pass;
    let e = request.body.isemailverified;
  
    
    const result = Joi.validate({ firstname: a, lastname: b ,email: c,password: d,emailverified: e }, schema );
    if(result.error!=null){
    console.log(result.error);
      response.send(result.error);
    }
    else{
     
      var hash = crypto.createHash('md5').update(d).digest('hex');
      console.log(hash); 
    poolVar.query( "INSERT INTO myuser (fn, ln, email, pass, isemailverified) VALUES ( '"+a+"','"+b+"', '"+c+"','"+hash+"', '"+e+"' )", (error, results) => {
   
      
      
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'niting01997@gmail.com',
            pass: ''
          }
        });
        var adr='http://localhost:3031/email_verification?email='+c+'';
        
        var mailOptions = {
          from: 'niting01997@gmail.com',
          to: c,
          subject: 'Congrats! SIGNUP SUCCESSFUL',
          html: 'To verify your Email-account <b> Please click on the given link : </b> <a href='+adr+'>localhost:3031/email_verification</i></a>'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {

            console.log('Email sent: ' + info.response);
            console.log("Successfully Signup!");
            
          }
        })
       
       // response.end("Successfully Signup!");
      
  
    response.status(200).json(results.rows)
  })
} 
}

module.exports.email_verification = (request, response) => {
  var q = url.parse(request.url, true);
  var qdata = q.query;
  console.log(qdata.email);
  poolVar.query( "update myuser set isemailverified='1' where email = '"+qdata.email+"'", (error, results) => {
    if(!error){
    response.end("Your email is successfully verified");
    console.log("Your email is successfully verified");}
    else
    throw error;
}
  )}
