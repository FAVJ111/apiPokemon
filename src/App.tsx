import PokemonList from './components/PokemonList';
import { useState } from 'react';
import SearchInput from './components/SearchInput';
import { Container } from 'react-bootstrap';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pokemon-app">
      <header className="pokemon-header py-4">
        <Container className="text-center">
          <div className="pokemon-logo mb-3">
            <i className="bi bi-p-circle" style={{ fontSize: '5rem', color: 'var(--pokemon-yellow)' }}></i>
          </div>
          <h1 className="text-white mb-0">Pokédex</h1>
          <p className="lead text-white">¡Tu enciclopedia Pokémon!</p>
        </Container>
      </header>

      <div className="pokemon-content py-5">
        <Container>
          <div className="search-container mb-5">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar Pokémon..."
            />
          </div>

          <PokemonList searchQuery={searchQuery} />
        </Container>
      </div>

      <footer className="pokemon-footer py-4 text-center">
        <Container>
          <p className="mb-0">© {new Date().getFullYear()} Pokédex App</p>
          <div className="pokeball-icon mt-2">
            <div className="pokeball"></div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default App;