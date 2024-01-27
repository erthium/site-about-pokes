
const BASE_URL = 'http://localhost:3000';

const fetchData = async (endpoing: string, parameter: any) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoing}/${parameter}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // If not JSON, assume it's plain text and return it as is
        return await response.text();
      }    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  

export class PokeApiService {
    static getPokeName = async (index: number): Promise<string> => {
        return fetchData('poke', index);
    }
    
    static getPokeImage = async (name: string): Promise<string> => {
        name = name.toLowerCase();
        console.log(name);
        return fetchData('image', name);
    }
    
    static getPokeAbilities = async (index: number): Promise<string[]> => {
        return fetchData('poke/abilities', index);
    }
    
    static getPokeAbilityDefs = async (index: number): Promise<string[]> => {
        return fetchData('poke/defs', index);
    }
    
}
