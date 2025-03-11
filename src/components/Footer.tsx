import React from 'react';
import { Box, Text, Link, HStack, Divider } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer" py={12} mt={16}>
      <Divider mb={8} borderColor="gray.200" />
      <HStack 
        spacing={4} 
        justify="center"
        color="gray.500"
        fontSize="sm"
      >
        <Text>
          Created by{' '}
          <Link 
            href="mailto:florian.kitterer@microsoft.com" 
            color="brand.500"
            fontWeight="medium"
            _hover={{
              color: 'brand.600',
              textDecoration: 'none'
            }}
          >
            Florian Kitterer
          </Link>
        </Text>
        <Box as="span">•</Box>
        <Link 
          href="https://github.com/Azure/azure-openai-landing-zone" 
          color="gray.500"
          _hover={{
            color: 'brand.500',
            textDecoration: 'none'
          }}
        >
          GitHub
        </Link>
      </HStack>
    </Box>
  );
};