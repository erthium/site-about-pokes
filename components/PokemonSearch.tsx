'use client';

import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import PokeData, { PokeDataProps } from './PokeData';
import LoadingScreen from './LoadingScreen';
import { PokeApiService } from '../services/pokeApiService';

const PokemonSearch: React.FC = () => {
    const [pokemonData, setPokemonData] = useState<PokeDataProps | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onSelectedEvent = (inputText: string) => {
        try{
            getPokemonData(inputText);
        }
        catch(e){
            console.log(e);
        }
    };

    const onPokeDataLoaded = () => {
        setIsLoading(false);
    }

    const getPokemonData = async (pokeName: string) => {
        setIsLoading(true);
        const isNameValid: boolean = await PokeApiService.getIsNameValid(pokeName); 
        if(isNameValid === false){
            console.log("Invalid pokemon name!");
            setIsLoading(false);
            return;
        }
        console.log("Getting pokemon data...");
        const pokeImageUrl: string = await PokeApiService.getPokeImage(pokeName);
        const pokeTypes: string[] = await PokeApiService.getPokeTypes(pokeName);
        const pokeStats: string = await PokeApiService.getPokeStats(pokeName);
        const pokeAbilities: string[] = await PokeApiService.getPokeAbilities(pokeName);
        const pokeAbilityDefs: string[] = await PokeApiService.getPokeAbilityDefs(pokeName);
        const pokeMoves: string[] = await PokeApiService.getPokeMoves(pokeName);
        const pokeMoveDefs: string[] = await PokeApiService.getPokeMoveDefs(pokeName);
        const pokeData: PokeDataProps = {
            name: pokeName,
            imageUrl: pokeImageUrl,
            pokeTypes: pokeTypes,
            stats: pokeStats,
            abilities: pokeAbilities,
            abilityDefs: pokeAbilityDefs,
            moves: pokeMoves,
            moveDefs: pokeMoveDefs,
            onLoaded: onPokeDataLoaded
        };
        setPokemonData(pokeData);
        console.log("Pokemon data retrieved.");
    }

    useEffect(() => {
        getPokemonData("pikachu");
      }, []);

    return(
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
    )
};

export default PokemonSearch;
