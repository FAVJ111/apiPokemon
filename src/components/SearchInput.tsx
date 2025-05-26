import { useDebounce } from '../hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const debouncedOnChange = useDebounce(onChange, 300);

  return (
    <input
      type="text"
      className="w-full max-w-md mx-auto block mb-8 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => debouncedOnChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;