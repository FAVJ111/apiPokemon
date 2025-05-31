// src/components/PokemonList.tsx
import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from "./PokemonCard";
import { useState, useEffect, useMemo } from 'react';
import { Pagination, Container, Row, Col, Alert } from 'react-bootstrap';

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

  const totalPages = Math.ceil((count || 0) / 20);
  
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Calcular las páginas visibles
  const visiblePages = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 7; // Máximo de páginas a mostrar
    
    // Calcular página inicial
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    // Ajustar si nos pasamos del total de páginas
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Generar las páginas
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [page, totalPages]);

  if (isLoading) return (
    <Container className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3">Cargando Pokémon...</p>
    </Container>
  );

  if (isError) return (
    <Alert variant="danger" className="text-center">
      Error al cargar Pokémon
    </Alert>
  );

  return (
    <Container>
      {pokemonList?.length === 0 ? (
        <Alert variant="info" className="text-center">
          {searchQuery 
            ? `No se encontraron Pokémon que coincidan con "${searchQuery}"` 
            : "No se encontraron Pokémon"}
        </Alert>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {pokemonList?.map((pokemon) => (
              <Col key={pokemon.name}>
                <PokemonCard name={pokemon.name} />
              </Col>
            ))}
          </Row>
          
          {pokemonList?.length > 0 && totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                <Pagination.First 
                  onClick={() => setPage(1)} 
                  disabled={page === 1}
                />
                <Pagination.Prev 
                  onClick={() => setPage(prev => Math.max(1, prev - 1))} 
                  disabled={page === 1}
                />
                
                {/* Botones de páginas visibles */}
                {visiblePages.map(pageNum => (
                  <Pagination.Item
                    key={pageNum}
                    active={pageNum === page}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Pagination.Item>
                ))}
                
                <Pagination.Next 
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))} 
                  disabled={page === totalPages}
                />
                <Pagination.Last 
                  onClick={() => setPage(totalPages)} 
                  disabled={page === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default PokemonList;