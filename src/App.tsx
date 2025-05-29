import PokemonList from './components/PokemonList';
import { useState } from 'react';
import SearchInput from './components/SearchInput';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Pokémon..."
      />

      <PokemonList searchQuery={searchQuery} />
    </div>
  );
};

export default App;