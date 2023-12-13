'use client'

import { NavBar } from '@/components/NavBar';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

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
    const username = auth.currentUser?.email;
    const profileImage = "/avatar.png";
    const router = useRouter();

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            router.push('/login');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
        <NavBar></NavBar>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <img src={profileImage} alt="Perfil" className=" bg-red-200 w-32 h-32 rounded-full mx-auto" />
                    <h1 className="text-center text-2xl font-semibold my-4">{username}</h1>
                    <button onClick={handleLogout} className="block w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </>
    );
}