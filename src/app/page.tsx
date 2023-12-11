'use client'
 
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
 
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const val = auth.currentUser?.uid;
      console.log(val);
      if (val != null) {
        router.push('/dashboard'); 
      }else{
        router.push('/login'); 
      }
      
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <img src="/load.gif" alt="Cargando..." className="w-20 h-20" /> 
    </div>
  );
};


