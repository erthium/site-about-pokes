// Import necessary dependencies
import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent, useRef, useEffect } from 'react';
import { PokeApiService } from '../services/pokeApiService';
// styles
import styles from '../styles/searchbar.module.css';

// Interface for SearchBarProps
interface SearchBarProps {
  onSelected: (name: string) => void;
}

// Interface for SearchBar state
interface SearchBarState {
  inputText: string;
  suggestions: string[];
  selectedSuggestionIndex: number;
}

// SearchBar component
const SearchBar: React.FC<SearchBarProps> = ({ onSelected }) => {
  // State initialization
  const [state, setState] = useState<SearchBarState>({
    inputText: '',
    suggestions: [],
    selectedSuggestionIndex: -1,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (input: string): Promise<string[]> => {
    if (input.length <= 0) return [];
    return await PokeApiService.getPokeSuggestions(input);
  };
  

  // Function to handle input changes
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newInputText = e.target.value;
    // Fetch suggestions based on the input (you need to implement this function)
    const newSuggestions = await fetchSuggestions(newInputText);
    setState({ inputText: newInputText, suggestions: newSuggestions, selectedSuggestionIndex: -1});
  };


  // Function to handle key events (for selecting suggestions)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if(state.selectedSuggestionIndex !== -1){
        onSelected(state.suggestions[state.selectedSuggestionIndex]);
        setState({ inputText: state.suggestions[state.selectedSuggestionIndex], suggestions: [], selectedSuggestionIndex: -1});
        // set the value of the input to the selected suggestion
        if (inputRef.current) {
          inputRef.current.value = state.suggestions[state.selectedSuggestionIndex];
        }
      }
      else{
        if (state.inputText.length > 0){
          onSelected(state.inputText);
          setState({ ...state, suggestions: [], selectedSuggestionIndex: -1});
        }
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.min(state.selectedSuggestionIndex + 1, state.suggestions.length - 1);
      setState({ ...state, selectedSuggestionIndex: newIndex });
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.max(state.selectedSuggestionIndex - 1, -1);
      setState({ ...state, selectedSuggestionIndex: newIndex });
    }
  };


  const handleSuggestionClick = (index: number) => {
    onSelected(state.suggestions[index]);
    setState({ inputText: state.suggestions[index], suggestions: [], selectedSuggestionIndex: -1});
  };


  const handleSuggestionHover = (index: number) => {
    setState({ ...state, selectedSuggestionIndex: index });
  };

  const handleRandomButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const randomPokeName = await PokeApiService.getRandomPoke();
    onSelected(randomPokeName);
    setState({ inputText: randomPokeName, suggestions: [], selectedSuggestionIndex: -1});
  }


  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Enter pokemon name..."
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.randomButton} onClick={handleRandomButtonClick}>
        ?
      </button>
      {state.suggestions.length > 0 && (
        <div ref={suggestionsRef} className={styles.suggestionContainer}>
          {/* Suggestions */}
          {state.suggestions.map((suggestion, index) => (
            <div
            className={styles.suggestionItem}
            key={index}
            onClick={() => handleSuggestionClick(index)}
            onMouseEnter={() => handleSuggestionHover(index)}
            style={{
              backgroundColor: index === state.selectedSuggestionIndex ? '#333' : 'black',
            }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
