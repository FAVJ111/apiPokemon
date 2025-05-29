export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (
  page: number = 1,
  limit: number = 20
) => {
  const offset = (page - 1) * limit;
  const response = await fetch(
    `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) throw new Error('Error fetching Pokémon list');
  return response.json() as Promise<PokemonListResponse>;
};

export const fetchPokemonDetails = async (
  nameOrId: string
) => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error('Error fetching Pokémon details');
  return response.json() as Promise<Pokemon>;
};