import React from 'react';

export interface PokeDataProps {
  name: string;
  imageUrl: string;
  pokeTypes: string[];
  stats: string;
  abilities: string[];
  abilityDefs: string[];
  moves: string[];
  moveDefs: string[];
}

const PokeData: React.FC<PokeDataProps> = ({name, imageUrl, pokeTypes, stats, abilities, abilityDefs, moves, moveDefs}) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name}/>
      <h3>Types</h3>
      <ul>
        {pokeTypes.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
      <h3>Stats</h3>
      <h4>{stats}</h4>
      <h3>Abilities and Definitions</h3>
      <ul>
        {abilities.map((ability, index) => (
          <li key={index}>
            {ability} - {abilityDefs[index]}
          </li>
        ))}
      </ul>
      <h3>Moves and Definitions</h3>
      <ul>
        {moves.map((move, index) => (
          <li key={index}>
            {move} - {moveDefs[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokeData;
