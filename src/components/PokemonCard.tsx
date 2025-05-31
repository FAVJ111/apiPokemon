import { useState } from 'react';
import { usePokemonDetails } from '../hooks/usePokemon';
import { Card, Badge, Button, Modal, Tab, Tabs } from 'react-bootstrap';

const PokemonCard = ({ name }: { name: string }) => {
  const { pokemon, isLoading } = usePokemonDetails(name);
  const [showModal, setShowModal] = useState(false);

  if (isLoading) return (
    <Card className="pokemon-card h-100">
      <Card.Body className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <Card className="pokemon-card h-100" onClick={() => setShowModal(true)}>
        <div className="card-header position-relative">
          <div className="pokemon-id">#{pokemon?.id}</div>
          <img 
            src={pokemon?.sprites.other['official-artwork'].front_default || 'https://via.placeholder.com/200'} 
            alt={name}
            className="pokemon-image"
          />
        </div>
        <Card.Body className="text-center mt-4">
          <Card.Title className="text-capitalize fw-bold">{name}</Card.Title>
          <div className="d-flex flex-wrap justify-content-center">
            {pokemon?.types.map((typeInfo: PokemonTypeInfo) => (
              <Badge 
                key={typeInfo.type.name}
                className={`badge-type badge-${typeInfo.type.name}`}
              >
                {typeInfo.type.name}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Card>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered
        size="lg"
        className="pokemon-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize pokemon-title">
            #{pokemon?.id} - {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="position-relative d-inline-block">
            <img
              src={pokemon?.sprites.other['official-artwork'].front_default}
              alt={name}
              className="img-fluid mb-4"
              style={{ maxHeight: '250px', zIndex: 2, position: 'relative' }}
            />
            <div className="pokemon-type-bg">
              {pokemon?.types.map((typeInfo: PokemonTypeInfo) => (
                <div 
                  key={typeInfo.type.name} 
                  className={`type-bg type-${typeInfo.type.name}`}
                ></div>
              ))}
            </div>
          </div>
          
          <Tabs defaultActiveKey="types" className="mb-3" justify>
            <Tab eventKey="types" title="Tipos">
              <div className="d-flex flex-wrap gap-2 justify-content-center my-3">
                {pokemon?.types.map((typeInfo: PokemonTypeInfo) => (
                  <Badge 
                    key={typeInfo.type.name} 
                    className={`badge-type badge-${typeInfo.type.name} fs-5 p-2`}
                  >
                    {typeInfo.type.name}
                  </Badge>
                ))}
              </div>
            </Tab>
            <Tab eventKey="stats" title="Estadísticas">
              <div className="row my-3">
                {pokemon?.stats.map((stat: PokemonStat) => (
                  <div key={stat.stat.name} className="col-6 mb-3">
                    <div className="fw-bold text-capitalize mb-2">
                      {stat.stat.name.replace('special-', 'Sp. ')}
                      <span className="ms-2 badge bg-primary">{stat.base_stat}</span>
                    </div>
                    <div className="progress" style={{ height: '15px' }}>
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: `${Math.min(100, stat.base_stat)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey="moves" title="Movimientos">
              <h5 className="mt-3">Movimientos principales</h5>
              <div className="d-flex flex-wrap gap-2 justify-content-center my-3">
                {pokemon?.moves.slice(0, 4).map((move: PokemonMove) => (
                  <Badge key={move.move.name} bg="info" className="fs-6 p-2">
                    {move.move.name}
                  </Badge>
                ))}
              </div>
              
              <h5 className="mt-4">Otros movimientos</h5>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {pokemon?.moves.slice(4, 10).map((move: PokemonMove) => (
                  <Badge key={move.move.name} bg="secondary" className="fs-6">
                    {move.move.name}
                  </Badge>
                ))}
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <div>
              <span className="fw-bold">Altura:</span> {pokemon && pokemon.height / 10}m
            </div>
            <div>
              <span className="fw-bold">Peso:</span> {pokemon && pokemon.weight / 10}kg
            </div>
            <Button 
              variant="danger" 
              onClick={() => setShowModal(false)}
              className="px-4"
            >
              Cerrar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PokemonCard;