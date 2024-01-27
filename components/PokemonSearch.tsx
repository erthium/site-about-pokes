'use client';

import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import PokeData, { PokeDataProps } from './PokeData';
import { PokeApiService } from '../services/pokeApiService';

const PokemonSearch: React.FC = () => {
    const [pokemonData, setPokemonData] = useState<PokeDataProps | null>();
    
    const onIndexChangedEvent = (index: string) => {
        try{
            const pokeIndex: number = parseInt(index);
            console.log(pokeIndex);
            getPokemonData(pokeIndex);
        }
        catch(e){
            console.log(e);
        }
    };

    const getPokemonData = async (index: number) => {
        const pokeName: string = await PokeApiService.getPokeName(index);
        const pokeImageUrl: string = await PokeApiService.getPokeImage(pokeName);
        const pokeAbilities: string[] = await PokeApiService.getPokeAbilities(index);
        const pokeAbilityDefs: string[] = await PokeApiService.getPokeAbilityDefs(index);
        const pokeData: PokeDataProps = {
            name: pokeName,
            imageUrl: pokeImageUrl,
            abilities: pokeAbilities,
            abilityDefs: pokeAbilityDefs
        };
        setPokemonData(pokeData);
    }

    return(
        <div>
            <SearchBar onIndexChange={onIndexChangedEvent} />
            {pokemonData && <PokeData {...pokemonData}/>}
        </div>
    )
};

export default PokemonSearch;
