import React, { useState, useEffect } from 'react';
import { Container, Box, Heading, useColorModeValue, Text, IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { FilterSection } from './components/FilterSection';
import { AcceleratorList } from './components/AcceleratorList';
import { Footer } from './components/Footer';

const MotionIconButton = motion(IconButton);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <Box bg={bgColor} minH="100vh">
      <Box
        bg="white"
        borderBottomWidth="1px"
        borderColor="gray.100"
        boxShadow="sm"
        mb={8}
      >
        <Container maxW="container.xl" py={8}>
          <Heading 
            as="h1" 
            textAlign="center"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            mb={2}
            bgGradient="linear(to-r, brand.500, brand.700)"
            bgClip="text"
          >
            Azure AI Solution Accelerator
          </Heading>
          <Text
            textAlign="center"
            color="gray.600"
            fontSize={{ base: "md", md: "lg" }}
            mb={8}
          >
            Discover and implement Azure solutions faster
          </Text>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Container>
      </Box>

      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <AcceleratorList searchQuery={searchQuery} selectedTags={selectedTags} />
        <FilterSection selectedTags={selectedTags} onTagToggle={handleTagToggle} />
        <Footer />
      </Container>
      <AnimatePresence>
        {showScrollButton && (
          <MotionIconButton
            aria-label="Scroll to top"
            icon={<ArrowUpIcon />}
            size="lg"
            colorScheme="brand"
            position="fixed"
            bottom="4"
            right="4"
            borderRadius="full"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}

export default App;
