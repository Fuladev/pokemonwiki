import React, { useState, useEffect, Suspense } from 'react';
import { fetchPokemonData } from '../app/api/api';

interface PokemonCardProps {
    nameP: string;
    onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ nameP , onClick}) => {
    const [pokemon, setPokemon] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchPokemonData(nameP);
                setPokemon(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return (
        <section className="relative justify-center items-center">
        <img className=" w-1/2" src="/load.gif"/>
        
      </section>
    );

    return (
        <div className="max-w-xs rounded-lg overflow-hidden shadow-lg pokemon-card" onClick={onClick}>

            <div className="relative">
                <img className="w-full h-auto bg-red-200" src={pokemon.sprites.front_default} alt={pokemon.name} />
                <span className=" absolute bottom-0 right-3 mb-2  inline-block bg-opacity-75 bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white  ">Peso: {pokemon.weight} kg</span>
            </div>
            <div className="px-6 py-2">
                <div className="font-bold text-3xl text-red-700 mb-2 capitalize">{pokemon.name}
                </div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-red-400 rounded-full px-2 py-1 text-xs font-semibold text-white mr-1 mb-2">{pokemon.abilities[0].ability.name || '-'}</span>
                <span className="inline-block bg-red-400 rounded-full px-2 py-1 text-xs font-semibold text-white mr-1 mb-2">{pokemon.abilities[1]?.ability.name || '-'}</span>
            </div>

        </div>

    );
};

export default PokemonCard;


