'use client';

import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import PokeData, { PokeDataProps } from './PokeData';
import { PokeApiService } from '../services/pokeApiService';

const PokemonSearch: React.FC = () => {
    const [pokemonData, setPokemonData] = useState<PokeDataProps | null>();
    
    const onSelectedEvent = (inputText: string) => {
        try{
            getPokemonData(inputText);
        }
        catch(e){
            console.log(e);
        }
    };

    const getPokemonData = async (pokeName: string) => {
        const isNameValid: boolean = await PokeApiService.getIsNameValid(pokeName); 
        if(isNameValid === false) return;
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
            moveDefs: pokeMoveDefs
        };
        setPokemonData(pokeData);
    }

    return(
        <div>
            <SearchBar onSelected={onSelectedEvent} />
            {pokemonData && <PokeData {...pokemonData}/>}
        </div>
    )
};

export default PokemonSearch;
