const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const Lead = require('../models/Lead.js')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//Métodos para tratamento dos dados

var localTime = (d) => {
    //var formatedDate = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    var date = new Date(d.valueOf() - d.getTimezoneOffset() * 60000);
	var formatedDate = date.toISOString().replace(/\.\d{3}Z$/, '').replace('T', ' ');
    return formatedDate;
};

var emailType = (email) => {
    var type;
    var emailProvider = email.substr(email.indexOf('@')+1, (email.length - email.indexOf('@')+1));
    if(emailProvider === 'hotmail.com' || emailProvider === 'gmail.com' )
        type = 'B2C';
    else
        type = 'B2B';
    return type;
};

// Métodos do express

app.get('/', (req, res) => {
    const path = require('path');
    res.sendFile(dirname + '/index.html');
});

app.post('/leads', (req, res) => {
    const name = req.body.lead.name.trim();
    const email = req.body.lead.email.trim();
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    const date_hour = localTime(new Date());
    const leadType = emailType(email);
    const lead = Lead.create({ name, email, ipAddress, date_hour, leadType });
    res.send(name + " - " + email + " - " + ipAddress + " - " + date_hour + " - " + leadType);
});

app.get('/leads.csv', (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'meusleads.csv\"');
    Lead.csv((data) => {
        res.send(data);
    });
});

app.listen(3000);