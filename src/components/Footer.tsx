import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer" py={6} textAlign="center" bg="white" mt={8}>
      <Text color="gray.600">
        Creator: <Link href="mailto:florian.kitterer@microsoft.com" color="blue.500">Florian Kitterer</Link>
      </Text>
    </Box>
  );
};