import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from "./PokemonCard";
import { useState, useEffect } from 'react';

interface PokemonListProps {
  searchQuery: string;
}

const PokemonList = ({ searchQuery }: PokemonListProps) => {
  const [page, setPage] = useState(1);
  const { pokemonList, count, isLoading, isError } = usePokemonList(
    page, 
    20, 
    searchQuery
  );

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  if (isLoading) return <div>Loading Pokémon...</div>;
  if (isError) return <div>Error loading Pokémon</div>;

  return (
    <div>
      {pokemonList?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? `No Pokémon found matching "${searchQuery}"` : "No Pokémon found"}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemonList?.map((pokemon) => (
              <PokemonCard key={pokemon.name} name={pokemon.name} />
            ))}
          </div>
          
          {pokemonList?.length > 0 && (
            <div className="flex justify-center gap-2 my-4">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">Page {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!count || page * 20 >= count}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonList;