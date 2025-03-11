import React from 'react';
import { Box, Heading, Text, HStack, Tag, Link, VStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Azure service color mapping
const getTagColor = (tag: string): string => {
  const tagColorMap: { [key: string]: string } = {
    'Azure OpenAI': 'teal',
    'Azure AI Search': 'purple',
    'Azure Cognitive Services': 'blue',
    'Azure AI Foundry': 'cyan',
    'Azure Functions': 'yellow',
    'Azure Machine Learning': 'green',
    'Azure Bot Service': 'pink',
    'Azure SQL Database': 'linkedin',
    'Azure Blob Storage': 'orange',
    'Azure Cache for Redis': 'red',
    'Azure Cosmos DB': 'messenger',
    'Azure Entra ID': 'telegram',
    'Application Insights': 'facebook',
    'Key Vault': 'whatsapp',
    'Vector Search': 'purple',
    'AI Agents': 'cyan',
    'RAG Pattern': 'teal',
    'Document Processing': 'orange',
    'LangChain': 'green'
  };
  // Make tag matching case-insensitive
  const normalizedTag = Object.keys(tagColorMap).find(
    key => key.toLowerCase() === tag.toLowerCase()
  );
  return normalizedTag ? tagColorMap[normalizedTag] : 'gray';
};

interface Accelerator {
  title: string;
  description: string;
  tags: string[];
  url: string;
}

interface AcceleratorCardProps {
  accelerator: Accelerator;
}

export const AcceleratorCard: React.FC<AcceleratorCardProps> = ({ accelerator }) => {
  // Get the color scheme from the first tag
  const primaryTagColor = accelerator.tags.length > 0 ? getTagColor(accelerator.tags[0]) : 'brand';

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="sm"
      _hover={{ 
        boxShadow: 'lg',
        transform: 'translateY(-4px)',
        borderColor: `${primaryTagColor}.200`,
        transition: 'all 0.3s ease'
      }}
      position="relative"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <VStack align="stretch" height="100%" spacing={4}>
        <Link 
          href={accelerator.url} 
          isExternal 
          _hover={{ textDecoration: 'none' }}
        >
          <HStack justify="space-between" align="start">
            <Heading 
              size="md" 
              color="gray.800"
              _hover={{ color: `${primaryTagColor}.500` }}
              transition="color 0.2s"
            >
              {accelerator.title}
            </Heading>
            <Icon 
              as={ExternalLinkIcon} 
              color="gray.400"
              _groupHover={{ color: `${primaryTagColor}.500` }}
            />
          </HStack>
        </Link>
        
        <Text 
          color="gray.600" 
          fontSize="sm"
          noOfLines={3}
          flex="1"
        >
          {accelerator.description}
        </Text>

        <Box>
          <HStack spacing={2} flexWrap="wrap" gap={2}>
            {accelerator.tags.map((tag) => (
              <Tag
                key={tag}
                size="sm"
                variant="subtle"
                colorScheme={getTagColor(tag)}
                borderRadius="full"
                py={1.5}
                px={3}
                fontSize="xs"
                fontWeight="medium"
                whiteSpace="nowrap"
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'sm'
                }}
                transition="all 0.2s"
              >
                {tag}
              </Tag>
            ))}
          </HStack>
        </Box>
      </VStack>
    </MotionBox>
  );
};
