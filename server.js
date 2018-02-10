const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app =express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();

    var log = now+' : '+req.method+' ' +req.url+'\n';
    fs.appendFile('server.log',log,(err)=>{
        if(err){
            console.log('Unable to Add File');
        }
    });
    next();
    console.log(now+' : '+req.method+' ' +req.url);
});
// app.use((req,res,next)=>{
//     res.render('Maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear()

});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();

});





app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle : "Welcome Page",
        welcomeMessage : 'Welcome to Home Page',
        currentYear : new Date().getFullYear()
    });

});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : "About Page",
        currentYear : new Date().getFullYear()
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'Unable to handle requests '
    });
});
app.listen(port,()=>{
    console.log('Server is running on port : '+port);
});
