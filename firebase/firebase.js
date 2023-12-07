import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCXw31t5iDiQ0pzAEo_-NsuYQIsLXpghuo",
  authDomain: "pokemonwiki-91da4.firebaseapp.com",
  projectId: "pokemonwiki-91da4",
  storageBucket: "pokemonwiki-91da4.appspot.com",
  messagingSenderId: "1011317117795",
  appId: "1:1011317117795:web:4abbf7513edc6e61b27956",
  measurementId: "G-61DBQ1FECX"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); 
}

export default firebase