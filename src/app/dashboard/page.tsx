"use client"
import React, { useState, useEffect } from 'react';
import { NavBar } from '../../components/NavBar';
import PokemonList from '../../components/pokemonlist';

export default function DashboardPage() {
    
    return (

        <div className="mx-auto  bg-white">
            <NavBar />
            <PokemonList pokemons={[]}/>
        </div>
    );
}

