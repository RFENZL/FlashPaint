// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./flashpaint-2d1f5-firebase-adminsdk-aafcj-628986b058.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://flashpaint-2d1f5-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.database(); 
module.exports = db;
