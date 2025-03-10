import React from 'react';
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <InputGroup>
      <Input
        placeholder="Search for solution accelerators..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="lg"
        borderRadius="full"
      />
      {searchQuery && (
        <InputRightElement h="full">
          <IconButton
            aria-label="Clear search"
            icon={<CloseIcon />}
            size="sm"
            variant="ghost"
            onClick={() => setSearchQuery('')}
            isRound
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
