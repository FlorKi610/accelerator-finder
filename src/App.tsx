import React, { useState } from 'react';
import { ChakraProvider, Container, Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { SearchBar } from './components/SearchBar';
import { FilterSection } from './components/FilterSection';
import { AcceleratorList } from './components/AcceleratorList';
import { Footer } from './components/Footer';
import { theme } from './theme';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Box bg={bgColor} minH="100vh" py={8}>
        <Container maxW="container.xl">
          <Heading 
            as="h1" 
            mb={8} 
            textAlign="center"
            bgGradient="linear(to-r, blue.400, blue.600)"
            bgClip="text"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
          >
            Azure AI Solution Accelerator Finder
          </Heading>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <FilterSection selectedTags={selectedTags} onTagToggle={handleTagToggle} />
          <AcceleratorList searchQuery={searchQuery} selectedTags={selectedTags} />
          <Footer />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
