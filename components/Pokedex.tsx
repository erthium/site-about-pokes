
import React, { useState } from "react";
import styles from "../styles/pokedex.module.css";

// pokedexProps
interface PokedexProps {
    pokeName: string;
}

const Pokedex: React.FC<PokedexProps> = ({pokeName}) => {
  // create a state for the answer of pokedex
  const [answer, setAnswer] = useState<string>("");

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Ask to Pokedex</h1>
        {/* Create 3 different block having the 3 questions user can ask, and 1 bigger block below those 3, for the answer of pokedex */}
        <div className={styles.questionBlock}>
            <div className={styles.question}>
                <p className={styles.questionText}>Can you tell me more about this Pokemon?</p>
            </div>
            <div className={styles.question}>
                <p className={styles.questionText}>What are the weaknesses of this Pokemon?</p>
            </div>
            <div className={styles.question}>
                <p className={styles.questionText}>What are the strengths of this Pokemon?</p>
            </div>
        </div>
        <div className={styles.answerBlock}>
            <p className={styles.asnwerParagraph}>
                Out of battery...
            </p>
        </div>
    </div>
  );
};

export default Pokedex;
