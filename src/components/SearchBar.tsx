import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputRightElement, IconButton, Box } from '@chakra-ui/react';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 100, 255, 0.1) }
  70% { box-shadow: 0 0 0 10px rgba(0, 100, 255, 0) }
  100% { box-shadow: 0 0 0 0 rgba(0, 100, 255, 0) }
`;

const scaleOut = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Search for solution accelerators...",
    "Find the perfect tool for your project...",
    "Discover innovative solutions...",
    "Explore our accelerator collection..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    const input = document.querySelector('input');
    if (input) {
      input.style.animation = `${scaleOut} 0.3s ease`;
      setTimeout(() => {
        setSearchQuery('');
        input.style.animation = 'none';
      }, 300);
    }
  };

  return (
    <Box
      w="100%"
      maxW="800px"
      mx="auto"
      mb={8}
      transform="translateY(0)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _focusWithin={{ 
        transform: 'translateY(-4px) scale(1.01)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <InputGroup size="lg">
        <Input
          placeholder={placeholders[placeholderIndex]}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          _hover={{ 
            borderColor: 'brand.300',
            transform: 'scale(1.005)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
          }}
          _focus={{ 
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          }}
          fontSize="md"
          pl={6}
          h="60px"
          borderRadius="2xl"
          transition="all 0.2s ease"
          animation={searchQuery === '' ? `${pulse} 2s infinite` : 'none'}
        />
        <InputRightElement h="full" pr={2}>
          {searchQuery ? (
            <IconButton
              aria-label="Clear search"
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              onClick={handleClear}
              color="gray.400"
              _hover={{ 
                color: 'gray.600',
                transform: 'rotate(90deg)',
              }}
              transition="all 0.2s ease"
              isRound
            />
          ) : (
            <SearchIcon 
              color="gray.400"
              transition="all 0.2s ease"
              _hover={{
                transform: 'scale(1.1)',
                color: 'brand.500'
              }}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
