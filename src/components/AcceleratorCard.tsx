import React from 'react';
import { Box, Heading, Text, HStack, Tag, Link } from '@chakra-ui/react';

interface AcceleratorCardProps {
  accelerator: {
    title: string;
    description: string;
    tags: string[];
    url: string;
  };
}

export const AcceleratorCard = ({ accelerator }: AcceleratorCardProps) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <Link href={accelerator.url} isExternal>
        <Heading size="md" mb={2}>
          {accelerator.title}
        </Heading>
      </Link>
      <Text mb={4} color="gray.600">
        {accelerator.description}
      </Text>
      <HStack spacing={2} wrap="wrap">
        {accelerator.tags.map((tag) => (
          <Tag key={tag} size="sm" colorScheme="blue" borderRadius="full">
            {tag}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};
