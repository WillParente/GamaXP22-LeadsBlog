const express = require('express');
const bodyParser = require('body-parser');
const Lead = require('./js/lead.js')
const app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/leads', (req, res) => {
    const name = req.body.lead.name.trim() + " "+ req.body.lead.lastName.trim();
	const email = req.body.lead.email.trim();
    const ip = req.headers['x-forwarded-for']
	|| req.connection.remoteAddress
	||req.socket.remoteAddress ||
	 (req.connection.socket ? req.connection.socket.remoteAddress : null);
	const ipAddress = ip.substring(7, ip.length);
	const date_hour = localTime(new Date());
    const leadType = emailType(email);
    const lead = Lead.create({ name, email, ipAddress, date_hour, leadType });
    res.send("Obrigado");
});

app.get('/leads.csv', (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'meusleads.csv\"');
    Lead.csv((data) => {
        res.send(data);
    });
});

app.listen(3000);

//Métodos para tratamento dos dados

// Hora local
var localTime = (d) => {
    //var formatedDate = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    var date = new Date(d.valueOf() - d.getTimezoneOffset() * 60000);
	var formatedDate = date.toISOString().replace(/\.\d{3}Z$/, '').replace('T', ' ');
    return formatedDate;
};

// Classificação do e-mail em B2C OU B2B
var emailType = (email) => {
	// alert('ClassificaTipo')
	let dominio = email.substring(email.indexOf("@") + 1, email.length);
	let listaConsumidor = [
	  'gmail.com',
	  'yahoo.com',
	  'hotmail.com',
	  'aol.com',
	  'hotmail.co.uk',
	  'hotmail.fr',
	  'msn.com',
	  'yahoo.fr',
	  'wanadoo.fr',
	  'orange.fr',
	  'comcast.net',
	  'yahoo.co.uk',
	  'yahoo.com.br',
	  'yahoo.co.in',
	  'live.com',
	  'rediffmail.com',
	  'free.fr',
	  'gmx.de',
	  'web.de',
	  'yandex.ru',
	  'ymail.com',
	  'libero.it',
	  'outlook.com',
	  'uol.com.br',
	  'bol.com.br',
	  'mail.ru',
	  'cox.net',
	  'hotmail.it',
	  'sbcglobal.net',
	  'sfr.fr',
	  'live.fr',
	  'verizon.net',
	  'live.co.uk',
	  'googlemail.com',
	  'yahoo.es',
	  'ig.com.br',
	  'live.nl',
	  'bigpond.com',
	  'terra.com.br',
	  'yahoo.it',
	  'neuf.fr',
	  'yahoo.de',
	  'alice.it',
	  'rocketmail.com',
	  'att.net',
	  'laposte.net',
	  'facebook.com',
	  'bellsouth.net',
	  'yahoo.in',
	  'hotmail.es',
	  'charter.net',
	  'yahoo.ca',
	  'yahoo.com.au',
	  'rambler.ru',
	  'hotmail.de',
	  'tiscali.it',
	  'shaw.ca',
	  'yahoo.co.jp',
	  'sky.com',
	  'earthlink.net',
	  'optonline.net',
	  'freenet.de',
	  't-online.de',
	  'aliceadsl.fr',
	  'virgilio.it',
	  'home.nl',
	  'qq.com',
	  'telenet.be',
	  'me.com',
	  'yahoo.com.ar',
	  'tiscali.co.uk',
	  'yahoo.com.mx',
	  'voila.fr',
	  'gmx.net',
	  'mail.com',
	  'planet.nl',
	  'tin.it',
	  'live.it',
	  'ntlworld.com',
	  'arcor.de',
	  'yahoo.co.id',
	  'frontiernet.net',
	  'hetnet.nl',
	  'live.com.au',
	  'yahoo.com.sg',
	  'zonnet.nl',
	  'club-internet.fr',
	  'juno.com',
	  'optusnet.com.au',
	  'blueyonder.co.uk',
	  'bluewin.ch',
	  'skynet.be',
	  'sympatico.ca',
	  'windstream.net',
	  'mac.com',
	  'centurytel.net',
	  'chello.nl',
	  'live.ca',
	  'aim.com',
	  'bigpond.net.au'];

	if (listaConsumidor.includes(dominio)) {
	  return 'B2C';
	} else {
	  return 'B2B';
	}
}