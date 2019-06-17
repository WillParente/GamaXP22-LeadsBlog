var firebase = require("firebase-admin");

var serviceAccount = require("./db/firebase-sa.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://blog-leads-firebase.firebaseio.com"
});

module.exports = firebase;