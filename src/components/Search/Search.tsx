import { Search as SearchIcon, XCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDebounce } from '../../hooks';

interface SearchChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

const Search = ({
  placeholder,
  onSearchChange,
}: {
  placeholder: string;
  onSearchChange: (value: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    (value: string) => {
      // setItemName(value);
      onSearchChange(value);
    },
    [onSearchChange],
  );
  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSearchChange = (e: SearchChangeEvent): void => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  const clearSearch = () => {
    setSearchTerm('');
    onSearchChange('');
    // setItemName('');
    // Trigger any search reset logic here
  };
  return (
    <div className='relative w-full'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <SearchIcon className='w-4 h-4 text-gray-500' />
      </div>
      <input
        type='text' // Changed from 'search' to 'text' to hide the default cancel button
        className='block w-full py-1 pl-10 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-0 focus:border-primary'
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
          <XCircle
            className='w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer'
            onClick={clearSearch}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
