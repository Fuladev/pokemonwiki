'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import firebase_auth from '../../../firebase/firebase_auth';
import { User } from "firebase/auth";




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
        const { error, user }: { error: string | undefined; user: User | undefined } = await firebase_auth.signWithEmail(email, password);

        console.log(user)
        if (error) {
            console.log(error);
            alert(`Error: ${error}`);
        }else{
            router.push('/dashboard');
        }

    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit}
                className="w-full max-w-xs p-4 border border-gray-300 rounded shadow-lg bg-white">
                <h2 className="text-center text-2xl font-semibold mb-4">Iniciar Sesión</h2>

                <div className="mb-4">
                    <TextField onChange={handleEmailChange} value={email} className="mb-4" name="email" type='email' id="outlined-basic" label="Correo Electrónico" variant="outlined" fullWidth />


                </div>
                <div className="relative mb-4">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        label="Password"
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

                    />

                </div>

                <button type="submit" className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">Ingresar</button>


            </form>
        </div>

    );
}
