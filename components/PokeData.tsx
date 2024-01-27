import React from 'react';

export interface PokeDataProps {
  name: string;
  imageUrl: string;
  abilities: string[];
  abilityDefs: string[];
}

const PokeData: React.FC<PokeDataProps> = ({ name, imageUrl, abilities, abilityDefs }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name}/>
      <h3>Abilities and Definitions</h3>
      <ul>
        {abilities.map((ability, index) => (
          <li key={index}>
            {ability} - {abilityDefs[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokeData;
