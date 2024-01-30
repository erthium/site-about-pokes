# Site About Pokemons

A simple site for getting pokemon data using [facts-about-pokes](https://github.com/ErtyumPX/facts-about-pokes) API, and wrapping it with NextJS.

## License

This project is licensed under [GNU GPL-3.0](https://github.com/ErtyumPX/site-about-pokes/blob/main/LICENSE) license.

## Setup

#### Requirements

This project was created with [NextJS](https://nextjs.org/), version 14.1.0 is used with TypeScript.

For package management, [NPM](https://www.npmjs.com/) version 10.4.0 is used.

#### Installation and Running

```bash
# installation
$ npm install

# running
$ npm run dev
```

There is almost none unit tests for now, hopefully will be added in the future.


## Structure

Everything is meant to be run in local for now, app is using the port `5000` and expecting the Nest API to be running on `localhost:3000`.

There is only one page. No routing is used or implemented.

### Services

Currently there is only 1 service, `PokeApiService`, which is used for communicating with the API.


### Components

#### SearchBar

Consists of a search bar, suggestions tab and a button for random pokemon.


#### PokeData

The main part that shows the data of the pokemon.

```tsx
// data needed to show the pokemon data
export interface PokeDataProps {
  name: string;
  imageUrl: string;
  pokeTypes: string[];
  stats: string;
  abilities: string[];
  abilityDefs: string[]; // ability definitions
  moves: string[];
  moveDefs: string[]; // move definitions
  onLoaded: () => void; // callback for when the image is loaded
}
```


#### PokemonSearch

This component is the main component that is shown on the page. It wraps up the `SearchBar` and the `PokeData` and also help with the communication between them.

While loading `PokemonData` with new data, the main part that takes time is the image. And some pokemons also does not have an image. While this image is being loaded, a simple loading text is shown. After `Img.onLoad` event is called, PokeData is shown. 

```tsx
<div>
    <SearchBar onSelected={onSelectedEvent} />
    {!!(isLoading) && 
        <div>
            <LoadingScreen/>
        </div>
    }
    {!!(pokemonData) && 
        <div style={{ display: isLoading ? 'none' : 'block' }}>
            <PokeData {...pokemonData}/>
        </div>
    }
</div>
```

#### Footer

No need to explain this one. Yet I simply cannot understand why would it be so difficult to stick something to the bottom of the page.

Currently this is applied for the main footer container.

```css
.container {
    /*...*/
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: grid;
}
```

---

### Pages

As mentioned before, there is only one page, `index.tsx`, which is the main page of the app.

```tsx
<main className={styles.main}>
    <PokemonSearch/>
    <Footer/>
</main>
```