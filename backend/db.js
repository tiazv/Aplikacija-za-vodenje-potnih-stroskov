const admin = require("firebase-admin");
//const serviceAccount = require("./key.json");

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY) || require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;