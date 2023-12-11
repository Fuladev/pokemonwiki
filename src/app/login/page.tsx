'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';

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


export default function Page() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();



    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };



    const handleSubmit = async () => {
        console.log(email, password);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push('/dashboard')
            })
            .catch((error) => {
                const errorMessage = error.message;

                Swal.fire({
                    icon: "error",
                    title: "Usuario no valido",
                    text: errorMessage,
                  });
            });


    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                className="w-full max-w-xs p-4 border border-gray-300 rounded shadow-lg bg-white">
                <h2 className="text-center text-2xl font-semibold mb-4">Iniciar Sesión</h2>

                <div className="mb-4">
                    <TextField
                        onChange={handleEmailChange}
                        value={email}
                        className="mb-3"
                        name="email"
                        type='email'
                        id="outlined-basic"
                        label="Correo Electrónico"
                        variant="outlined"
                        fullWidth />
                </div>
                <div className="relative mb-4">
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            name="password"
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </div>

                <button type="button" onClick={handleSubmit} className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">Ingresar</button>


            </form>
        </div>

    );
}
