import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCXw31t5iDiQ0pzAEo_-NsuYQIsLXpghuo",
    authDomain: "pokemonwiki-91da4.firebaseapp.com",
    projectId: "pokemonwiki-91da4",
    storageBucket: "pokemonwiki-91da4.appspot.com",
    messagingSenderId: "1011317117795",
    appId: "1:1011317117795:web:4abbf7513edc6e61b27956",
    measurementId: "G-61DBQ1FECX"
  };
  
  
  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);