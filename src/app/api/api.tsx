export const fetchPokemonsList = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1017');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching pokemons list: ", error);
    throw error;
  }
};

export const fetchPokemonData = async (pokemonName: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

