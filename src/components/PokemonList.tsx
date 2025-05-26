import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from "./PokemonCard";
import { useState } from 'react';

const PokemonList = () => {
  const [page, setPage] = useState(1);
  const { pokemonList, count, isLoading, isError } = usePokemonList(page);

  if (isLoading) return <div>Loading Pokémon...</div>;
  if (isError) return <div>Error loading Pokémon</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList?.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
      
      {/* Paginación */}
      <div className="flex justify-center gap-2 my-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!count || page * 20 >= count}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;