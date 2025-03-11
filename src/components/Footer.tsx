import React from 'react';
import { Box, Text, Link, HStack, Divider, Icon, VStack } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const Footer = () => {
  return (
    <Box as="footer" py={12} mt={16}>
      <Divider mb={8} borderColor="gray.200" />
      <VStack spacing={3}>
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
            href="https://github.com/floriankitterer/acc-find" 
            color="gray.500"
            _hover={{
              color: 'brand.500',
              textDecoration: 'none'
            }}
          >
            GitHub
          </Link>
        </HStack>
        <Text fontSize="xs" color="gray.400">
          Powered by{' '}
          <Link 
            href="https://azure.microsoft.com/services/app-service/static/" 
            isExternal
            color="blue.400"
            _hover={{ color: 'blue.500' }}
          >
            Azure Static Web Apps <Icon as={ExternalLinkIcon} mx="1px" boxSize="10px" />
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};