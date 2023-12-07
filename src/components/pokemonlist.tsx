"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { fetchPokemonsList } from '../app/api/api';
import PokemonCard from './PokemonCard';
import Pagination from '@mui/material/Pagination';
import { Box, Modal } from '@mui/material';
import BodyModal from './bodymodal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pokemonsPerPage] = useState<number>(10);
  const [pokemonNumber, setPokemonNumber] = useState<number>(0)

  const [open, setOpen] = React.useState(false);
  const handleOpen = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);



  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);


  };

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setPokemons([]);
        const pokemonsList = await fetchPokemonsList();

        const value = pokemonsList.length / pokemonsPerPage;
        setPokemonNumber(Math.ceil(value));
        const indexOfLastPokemon = currentPage * pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
        const currentPokemons = pokemonsList.slice(indexOfFirstPokemon, indexOfLastPokemon);


        setPokemons(currentPokemons);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [currentPage]);



  if (loading) return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>

      </Suspense>

    </section>
  );

  return (
    <>
      <main className="mx-auto p-3">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {pokemons.map((pokemon, index) => (
            <PokemonCard key={index} nameP={pokemon.name} onClick={() => handleOpen(pokemon)} />
          ))}
        </ul>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Pagination size="small" boundaryCount={2} count={pokemonNumber} page={currentPage} onChange={handleChange} variant="outlined" color="secondary" />
        </Box>

      </main>


      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen h-full xs:h-full"> 
          <div className="bg-white p-5 rounded-lg shadow-md w-5/6 max-w-4xl relative m-auto md:w-11/12 md:h-full "> 
            <div className="flex justify-end"> 
              <button
                className="absolute top-2 right-5 bg-transparent cursor-pointer border-none w-8"
                onClick={handleClose}
              >
                <HighlightOffIcon sx={{ color: 'red', fontSize: 40 }} />
              </button>
            </div>

            <div className="flex justify-center"> 
              <BodyModal nameP={selectedPokemon?.name || ""} />
            </div>
          </div>
        </div>
      </Modal>

    </>

  );
};

export default PokemonList;
