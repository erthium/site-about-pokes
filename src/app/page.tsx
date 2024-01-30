import PokemonSearch from "../../components/PokemonSearch";
import Footer from "../../components/Footer";
import styles from "../../styles/home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <PokemonSearch/>
      <Footer/>
    </main>
  );
}
