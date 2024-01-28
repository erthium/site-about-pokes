// Import necessary dependencies
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { PokeApiService } from '../services/pokeApiService';

// Interface for SearchBarProps
interface SearchBarProps {
  onSelected: (name: string) => void;
}

// Interface for SearchBar state
interface SearchBarState {
  inputText: string;
  suggestions: string[];
}

// SearchBar component
const SearchBar: React.FC<SearchBarProps> = ({ onSelected }) => {
  // State initialization
  const [state, setState] = useState<SearchBarState>({
    inputText: '',
    suggestions: [],
  });


  const fetchSuggestions = async (input: string): Promise<string[]> => {
    if (input.length <= 0) return [];
    return await PokeApiService.getPokeSuggestions(input);
  };
  

  // Function to handle input changes
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newInputText = e.target.value;
    // Fetch suggestions based on the input (you need to implement this function)
    const newSuggestions = await fetchSuggestions(newInputText);
    setState({ inputText: newInputText, suggestions: newSuggestions });
  };


  // Function to handle key events (for selecting suggestions)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        onSelected(state.inputText);
    } else if (e.key === 'ArrowDown') {
      // Handle Arrow Down key press (you might want to highlight/select the next suggestion)
      // For simplicity, I'm not implementing this in detail
    } else if (e.key === 'ArrowUp') {
      // Handle Arrow Up key press (you might want to highlight/select the previous suggestion)
      // For simplicity, I'm not implementing this in detail
    }
  };


  return (
    <div>
      <input
        type="text"
        value={state.inputText}
        placeholder="Enter pokemon name..."
        style={{ color: 'red' }}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        {/* Suggestions */}
        {state.suggestions.map((suggestion, index) => (
          <div key={index}>{suggestion}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
