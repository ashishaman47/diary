import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDv-TZkrJPSmB3UArdCSAidzLNYM4UF-2Q',
  authDomain: 'diary-8308a.firebaseapp.com',
  databaseURL: 'https://diary-8308a.firebaseio.com',
  projectId: 'diary-8308a',
  storageBucket: 'diary-8308a.appspot.com',
  messagingSenderId: '853924098272',
  appId: '1:853924098272:web:b400ea3245abe613c52085',
  measurementId: 'G-BMBXL2FRY7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const database = firebase.database().ref('/notes');
export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
