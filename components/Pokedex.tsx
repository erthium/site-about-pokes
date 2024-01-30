
import React from "react";
import styles from "../styles/pokedex.module.css";

// pokedexProps
interface PokedexProps {
    pokeName: string;
}

const Pokedex: React.FC<PokedexProps> = ({pokeName}) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Ask to Pokedex</h1>
        <img
            className={styles.pokedexImage}
            src=""
            alt="pokedex"
        />
    </div>
  );
};

export default Pokedex;
