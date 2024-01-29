import React from 'react';
import styles from '../styles/pokedata.module.css';

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
    <div className={styles.container}>
      <h2 className={styles.pokeName}>{name}</h2>
      <img className={styles.pokeImage} src={imageUrl} alt={name}/>
      <h3 className={styles.title}>Types</h3>
      <ul className={styles.listContainer}>
        {pokeTypes.map((type, index) => (
          <li className={styles.listItem} key={index}>{type}</li>
        ))}
      </ul>
      <h3 className={styles.title}>Stats</h3>
      <h4 className={styles.normalText}>{stats}</h4>
      <h3 className={styles.title}>Abilities and Definitions</h3>
      <ul className={styles.listContainer}>
        {abilities.map((ability, index) => (
          <li className={styles.listItem} key={index}>
            {ability} - {abilityDefs[index]}
          </li>
        ))}
      </ul>
      <h3 className={styles.title}>Moves and Definitions</h3>
      <ul className={styles.listContainer}>
        {moves.map((move, index) => (
          <li className={styles.listItem} key={index}>
            {move} - {moveDefs[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokeData;
