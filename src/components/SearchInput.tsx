import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Form } from 'react-bootstrap';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="position-relative">
      <Form.Control
        type="text"
        size="lg"
        placeholder={placeholder || "Buscar..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded-pill shadow-sm ps-4 py-3 border-2 border-primary"
      />
      <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-4 text-primary"></i>
    </div>
  );
};

export default SearchInput;