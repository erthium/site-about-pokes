import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onIndexChange: (index: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onIndexChange }) => {
  const [index, setIndex] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value);
  };

  const handleButtonClick = () => {
    onIndexChange(index);
  };

  return (
    <div>
      <input type="text" 
            value={index} 
            placeholder='Enter Pokemon Index...'
            style={{color: 'red'}}
            onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Get Data</button>
    </div>
  );
};

export default SearchBar;
