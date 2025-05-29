import useSWR from 'swr';
import { fetchPokemonList, fetchPokemonDetails, API_BASE_URL } from '../api/pokemon';

export const usePokemonList = (
    page: number = 1,
    limit: number = 20,
    searchQuery: string = ''
) => {
    const isSearchMode = searchQuery.trim() !== '';

    const url = isSearchMode
        ? `${API_BASE_URL}/pokemon?limit=1000`
        : `${API_BASE_URL}/pokemon?limit=${limit}&offset=${(page - 1) * limit}`;

    // Clave de caché única que incluye searchQuery
    const { data, error, isLoading } = useSWR(
        ['pokemonList', page, limit, searchQuery],
        () => fetch(url).then(res => res.json())
    );

    let pokemonList: NamedAPIResource[] = data?.results || [];
    if (isSearchMode) {
        pokemonList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const startIndex = (page - 1) * limit;
        pokemonList = pokemonList.slice(startIndex, startIndex + limit);
    }

    return {
        pokemonList,
        count: isSearchMode ? pokemonList.length : data?.count,
        isLoading,
        isError: error,
    };
};

export const usePokemonDetails = (name: string) => {
    const { data, error, isLoading } = useSWR(
        name ? ['pokemonDetails', name] : null,
        ([, name]) => fetchPokemonDetails(name)
    );
    return {
        pokemon: data,
        isLoading,
        isError: error,
    };
}