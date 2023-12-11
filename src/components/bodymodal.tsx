import React, { useState, useEffect, Suspense } from 'react';
import { fetchPokemonData } from '../app/api/api';
import { Box, Grid} from '@mui/material';

interface BodyModalProps {
    nameP: string;
}



const BodyModal: React.FC<BodyModalProps> = ({ nameP }) => {
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

    const list = [];
    const llist = pokemon.abilities?.length;

    for (let i = 0; i < llist; i++) {
        list.push(pokemon.abilities[i].ability.name);
    }

    const listS = [];
    const nlist = pokemon.stats?.length;
    for (let i = 0; i < nlist; i++) {
        listS.push(pokemon.stats[i].stat.name + ' : ' +pokemon.stats[i].base_stat);
        
    }




    if (loading) return (
        <section className="relative flex justify-center items-center">
            <img className=" w-1/2" src="/load.gif" />

        </section>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={6} md={6}>
                        <img className="w-full h-auto rounded-md shadow-md bg-red-200" src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <img className="w-full h-auto rounded-md shadow-md bg-red-200" src={pokemon.sprites.front_shiny || '/no_shiny.png'} alt={pokemon.name} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <div className='relative md:absolute md:right-auto md:top-auto top-3 left-auto'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl capitalize font-bold text-red-700 mb-4 '>{pokemon?.name}</h1>
                            <h2 className='text-xl md:text-2xl lg:text-2xl font-semibold text-red-600 mb-2'>Habilidades</h2>
                            <ul className='flex flex-wrap text-xl mb-0 left-0'>
                                {list.map((abilityName, index) => (
                                    <li className=" text-sm md:text-sm lg:text-sm capitalize bg-red-400 rounded-full px-2 py-1 font-semibold text-white mr-2 mb-2 " key={index}>{abilityName}</li>
                                ))}
                            </ul>
                            <h2 className='text-xl md:text-2xl lg:text-2xl font-semibold text-red-600'>Estadististicas</h2>
                            <ul className='flex flex-wrap text-xl mb-0 left-0'>
                                {listS.map((stateName, index) => (
                                    <li className=" text-sm md:text-sm lg:text-sm capitalize bg-red-400 rounded-full px-2 py-1 font-semibold text-white mr-2 mb-2 " key={index}>{stateName}</li>
                                ))}
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default BodyModal;

