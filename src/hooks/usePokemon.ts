import useSWR from 'swr';
import { fetchPokemonList, fetchPokemonDetails } from '../api/pokemon';

export const usePokemonList = (page: number = 1, limit: number = 20) => {
    const { data, error, isLoading } = useSWR(
        ['pokemonList', page, limit],
        () => fetchPokemonList(page, limit)
    );
    return {
        pokemonList: data?.results,
        count: data?.count,
        isLoading,
        isError: error,
    };
};

export const usePokemonDetails = (name: string) => {
    const { data, error, isLoading } = useSWR(
        name ? ['pokemonDetails', name]: null,
        ([, name]) => fetchPokemonDetails(name)
    );
    return {
        pokemon: data,
        isLoading,
        isError: error,
    };
}