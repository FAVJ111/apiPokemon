import { usePokemonDetails } from '../hooks/usePokemon';

const PokemonCard = ({ name }: { name: string }) => {
  const { pokemon, isLoading } = usePokemonDetails(name);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <img
        src={pokemon?.sprites.other['official-artwork'].front_default}
        alt={name}
        className="w-full h-48 object-contain"
      />
      <h3 className="text-xl font-bold text-center capitalize">{name}</h3>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {pokemon?.types.map((type) => (
          <span
            key={type.type.name}
            className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;