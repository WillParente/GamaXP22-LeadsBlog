/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCnerm82bioiOsvzHNTrMrVNw41bSWsou0",
    authDomain: "pixel-leads-db.firebaseapp.com",
    databaseURL: "https://pixel-leads-db.firebaseio.com",
    projectId: "pixel-leads-db",
    storageBucket: "pixel-leads-db.appspot.com",
    messagingSenderId: "780430182876",
    appId: "1:780430182876:web:19e84e3d4fbb13ea"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
*/

var firebase = require("firebase-admin");

var serviceAccount = require("../json/pixel-leads-db.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://pixel-leads-db.firebaseio.com"
});

module.exports = firebase;