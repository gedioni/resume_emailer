var port = process.env.PORT || 8000;

var express = require('express');
var fs = require('fs');
var path = require('path');
var nodemailer =require('nodemailer');
var app = express();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fviclass@gmail.com',
        pass: 'fviclass2017'
    }
});

//Middlers...middlers determine how the front-end and back-end communicate and work(Parse)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//Expose static content like css, js, images
app.use('/', express.static(path.join(__dirname, 'assets')));


//Create a route // Any thing you are sending through URL is "GET" request
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'form.html'));
});


app.post('/', function (req, res){
    
    var emailBody = fs.readFileSync('./resume.html');

    var mailOptions = {
        form: req.body.from,
        to: req.body.destination,
        html: emailBody,
        subject: req.body.subject
    };

    transporter.sendMail(mailOptions, function (err, info){
        if(err) 
        return res.send({
            success: false,
            message: err.message 
        });

        res.send({
            success: true,
            message: 'Your resume has been successfully sent!'
        });
    });
});


app.listen(port, function(err){
    if(err){
        return console.log(err);
    }

    console.log('server listening on port', port);
});