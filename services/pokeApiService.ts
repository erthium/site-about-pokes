const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://facts-about-pokes.vercel.app';

const fetchData = async (endpoing: string, parameter: any) => {
    try {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
        const url = `${BASE_URL}/${endpoing}/${parameter}`;
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            // If not JSON, assume it's plain text and return it as is
            return await response.text();
        }    
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export class PokeApiService {
    static getIsNameValid = async (name: string): Promise<boolean> => {
        const data: string = await fetchData('poke/valid', name);
        return data === 'true';
    }


    static getPokeName = async (index: number): Promise<string> => {
        return fetchData('poke', index);
    }
    

    static getPokeImage = async (name: string): Promise<string> => {
        name = name.toLowerCase();
        return fetchData('image', name);
    }
    

    static getPokeAbilities = async (name: string): Promise<string[]> => {
        return fetchData('poke/abilities', name);
    }
    

    static getPokeAbilityDefs = async (name: string): Promise<string[]> => {
        return fetchData('poke/abilities/defs', name);
    }


    static getPokeSuggestions = async (name: string): Promise<string[]> => {
        return fetchData('poke/suggest', name);
    }


    static getPokeMoves = async (name: string): Promise<string[]> => {
        return fetchData('poke/moves', name);
    }


    static getPokeMoveDefs = async (name: string): Promise<string[]> => {
        return fetchData('poke/moves/defs', name);
    }


    static getPokeStats = async (name: string): Promise<string> => {
        return fetchData('poke/stats', name);
    }


    static getPokeTypes = async (name: string): Promise<string[]> => {
        return fetchData('poke/types', name);
    }


    static getRandomPoke = async (): Promise<string> => {
        return fetchData('poke/random', '');
    }


    static testPokedexConnection = async (): Promise<boolean> => {
        const response = await fetchData('pokedex/test', '');
        return response === 'true';
    }


    static askAboutPoke = async (name: string): Promise<string> => {
        return fetchData('pokedex/ask', `${name}/about`);
    }


    static askAboutWeaknesses = async (name: string): Promise<string> => {
        return fetchData('pokedex/ask', `${name}/weaknesses`);
    }


    static askAboutStrengths = async (name: string): Promise<string> => {
        return fetchData('pokedex/ask', `${name}/strengths`);
    }

    
    static generateImage = async (name: string): Promise<string> => {
        console.log('Generating image...');
        return fetchData('image/generate', name);
    }
}
