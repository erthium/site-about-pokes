import React, { useEffect, useState } from "react";
import styles from "../styles/pokedex.module.css";
import { PokeApiService } from "../services/pokeApiService";
import { PacmanLoader } from "react-spinners";

interface PokedexProps {
    pokeName: string;
}

const Pokedex: React.FC<PokedexProps> = ({pokeName}) => {
  const [answer, setAnswer] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);


  const askAboutPokemon = async () => {
    try {
      if (!isConnected) {
        onConnectionError();
        return;
      }
      setIsRequesting(true);
      const pokedexAnswer = await PokeApiService.askAboutPoke(pokeName);
      setAnswer(pokedexAnswer);
      setIsRequesting(false);
    }
    catch(e){
      console.log(e);
      onServerError();
    }
  }

  const askAboutWeaknesses = async () => {
    try {
      if (!isConnected) {
        onConnectionError();
        return;
      }
      setIsRequesting(true);
      const pokedexAnswer = await PokeApiService.askAboutWeaknesses(pokeName);
      setAnswer(pokedexAnswer);
      setIsRequesting(false);
    }
    catch(e){
      console.log(e);
      onServerError();
    }
  }

  const askAboutStrengths = async () => {
    try {
      if (!isConnected) {
        onConnectionError();
        return;
      }
      setIsRequesting(true);
      const pokedexAnswer = await PokeApiService.askAboutStrengths(pokeName);
      setAnswer(pokedexAnswer);
      setIsRequesting(false);
    }
    catch(e){
      console.log(e);
      onServerError();
    }
  }

  const onConnectionError = () => {
    setAnswer("Out of battery...");
  }

  const onServerError = () => {
    setAnswer("Device must have had water damage during the last battle. Pokedex is not responding.");
  }

  useEffect(() => {
    try {
      PokeApiService.testPokedexConnection()
      .then((result) => {
          console.log("Connection successful");
          setIsConnected(true);
      })
    }
    catch(e){
      console.log(e);
      onConnectionError();
      setIsConnected(false);
    }
  }, []);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ask to Pokedex AI</h1>
      {/* Create 3 different block having the 3 questions user can ask, and 1 bigger block below those 3, for the answer of pokedex */}
      <div className={styles.questionBlock}>
        <div className={styles.question} onClick={askAboutPokemon}>
          <p className={styles.questionText}>Can you tell me more about this Pokemon?</p>
        </div>
        <div className={styles.question} onClick={askAboutWeaknesses}>
          <p className={styles.questionText}>What are the weaknesses of this Pokemon?</p>
        </div>
        <div className={styles.question} onClick={askAboutStrengths}>
          <p className={styles.questionText}>What are the strengths of this Pokemon?</p>
        </div>
      </div>
      <div className={styles.answerBlock}>
        {isRequesting
          ? <PacmanLoader color={"#555"} size={20} className={styles.answerLoading}/>
          : 
          <p className={styles.asnwerParagraph}>
            {answer}
          </p>
        }
      </div>
    </div>
  );
};

export default Pokedex;
