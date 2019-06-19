var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
var lastInput = document.getElementById('lastInput');
var emailInput = document.getElementById('emailInput');
var addButton = document.getElementById('addButton');

//Ao clicar no botão 
addButton.addEventListener('click', function(){
    create(nameInput.value,lastInput.value, emailInput.value);
});

function create(name,lastname, email){
    var data = {
        name:name,
        lastname:lastname,
        email:email,
    };
    return firebase.database().ref().child('users').push(data);
}

firebase.database().ref('users').on('value', function(snapshot){
    usersList.innerHTML='';
    snapshot.forEach(function(item){
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().name + ':' + item.val().email  + item.val().lastInput));
        usersList.appendChild(li);
    });
        
    });

    classificaTipo = (email) => {
        // alert('ClassificaTipo')
        let dominio = email.substring(email.indexOf("@") + 1, email.length);
        let listaConsumidor = [
          'gmail.com',
          'uol.com.br',
          'ig.com.br',
          'outlook.com',
          'outlook.com.br',
          'hotmail.com',
          'hotmail.com.br',
          'bol.com.br',
          'icloud.com',
          'terra.com.br',
          'globo.com',
          'yahoo.com.br',
          'yahoo.com.br'];
    
        if (listaConsumidor.includes(dominio)) {
          return 'B2C';
        } else {
          return 'B2B';
        }
    
      }
      formatData = (data) => {
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
    
      }
    
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
