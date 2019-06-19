var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
var emailInput = document.getElementById('emailInput');
var addButton = document.getElementById('addButton');

//Ao clicar no botão
addButton.addEventListener('click', function(){
    create(nameInput.value, emailInput.value);
});

function create(name, email){
    var data = {
        name:name,
        email:email,
    };
    return firebase.database().ref().child('users').push(data);
}

	firebase.database().ref('users').on('value', function(snapshot){
		usersList.innerHTML='';
		snapshot.forEach(function(item){
			var li = document.createElement('li');
			li.appendChild(document.createTextNode(item.val().name + ':' + item.val().email));
			usersList.appendChild(li);
		});
	});

	// Formatação da data para o padrão YYYY-MM-DD hh:mm:ss
	  formatDate = (data) => {
		var date = new Date(d.valueOf() - d.getTimezoneOffset() * 60000);
		  var formatedDate = date.toISOString().replace(/\.\d{3}Z$/, '').replace('T', ' ');
		return formatedDate;
	  }
    
    
	  /*formatData = (data) => {
		let dia = data.getDate().toString();
		let diaf = dia.length === 1 ? '0' + dia : dia;
		let mes = (data.getMonth() + 1).toString();
		let mesf = mes.length === 1 ? '0' + mes : mes;
		let ano = data.getFullYear().toString();
		let anof = ano.length === 1 ? '0' + ano : ano;

		let hora = data.getHours().toString();
		let horaf = hora.length === 1 ? '0' + hora : hora;
		let minuto = data.getMinutes().toString();
		let minutof = minuto.length === 1 ? '0' + minuto : minuto;
		let segundos = data.getSeconds().toString();
		let segundosf = segundos.length === 1 ? '0' + segundos : segundos;
		let d = anof + '-' + mesf + '-' + diaf + ' ' + horaf + ':' + minutof + ':' + segundosf;

		return d;

	  }*/
    
     /*getIp  () {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json", true);
          xhr.setRequestHeader("Accept", 'application/json');
          xhr.setRequestHeader("origin", 'x-request-with');
          xhr.send();
          let response = [];
          // alert(xhr.readyState);
          xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              response = JSON.parse(xhr.responseText).ip;
              // alert(JSON.stringify(response));
              resolve(response);
            }
          };
    
        })
    
      };*/
	// Classificação do e-mail em B2C OU B2B
	classificaTipo = (email) => {
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