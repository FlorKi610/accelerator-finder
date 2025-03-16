import React, { useState } from 'react';
import { Box, Heading, Text, HStack, Tag, Link, VStack, Icon, Flex, Button, Badge, Tooltip } from '@chakra-ui/react';
import { ExternalLinkIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { calculateMonthlyCost } from '../services/costCalculationService';
import { CostBreakdownModal } from './CostBreakdownModal';

const MotionBox = motion(Box);

// Azure service color mapping with enhanced popular service colors
const getTagColor = (tag: string): string => {
  const tagColorMap: { [key: string]: string } = {
    // Most used services with vibrant colors
    'Azure OpenAI': 'teal',
    'Azure AI Search': 'purple',
    'RAG Pattern': 'cyan',
    'Vector Search': 'blue',
    'Azure Cognitive Services': 'blue',
    
    // Other services
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
    'AI Agents': 'cyan',
    'Document Processing': 'orange',
    'LangChain': 'green',
    'Audio Processing': 'pink',
    'Speech Services': 'purple',
    'Computer Vision': 'teal',
    'Generative AI': 'blue',
    'Image Processing': 'cyan',
    'TypeScript': 'blue',
    'React': 'cyan',
    'C#': 'purple',
    '.NET': 'blue',
    'Java': 'red',
    'Spring Boot': 'green',
    'Python': 'blue'
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
  author?: string;
  useCase?: {
    small: number;
    medium: number;
    large: number;
  };
}

interface AcceleratorCardProps {
  accelerator: Accelerator;
}

export const AcceleratorCard: React.FC<AcceleratorCardProps> = ({ accelerator }) => {
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  
  // Get the color scheme from the first tag
  const primaryTagColor = accelerator.tags.length > 0 ? getTagColor(accelerator.tags[0]) : 'brand';

  // Calculate estimated costs
  const smallCost = calculateMonthlyCost(accelerator.tags, 'small');
  const mediumCost = calculateMonthlyCost(accelerator.tags, 'medium');
  const largeCost = calculateMonthlyCost(accelerator.tags, 'large');

  return (
    <>
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
        height="100%"
        display="flex"
        flexDirection="column"
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

          {/* Cost Estimate Section */}
          <Box 
            p={3} 
            borderRadius="md" 
            bg="gray.50"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="medium" fontSize="sm">Estimated Monthly Cost:</Text>
              <Button 
                size="xs" 
                colorScheme="blue" 
                variant="outline"
                rightIcon={<InfoOutlineIcon />}
                onClick={() => setIsCostModalOpen(true)}
              >
                Details
              </Button>
            </HStack>
            
            <HStack spacing={4} justify="space-between">
              <Tooltip label="Small deployment: 1-10 users">
                <Badge colorScheme="green" p={1} borderRadius="md">
                  S: ${smallCost}
                </Badge>
              </Tooltip>
              <Tooltip label="Medium deployment: 10-100 users">
                <Badge colorScheme="blue" p={1} borderRadius="md">
                  M: ${mediumCost}
                </Badge>
              </Tooltip>
              <Tooltip label="Large deployment: 100+ users">
                <Badge colorScheme="purple" p={1} borderRadius="md">
                  L: ${largeCost}
                </Badge>
              </Tooltip>
            </HStack>
          </Box>

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
          
          {accelerator.author && (
            <Box mt="auto" pt={2} borderTopWidth="1px" borderTopColor="gray.100">
              <Flex align="center" justify="space-between">
                <HStack spacing={1}>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium">
                    Author:
                  </Text>
                  <Link 
                    href={`https://github.com/${accelerator.author}`} 
                    isExternal
                    fontSize="xs"
                    color={`${primaryTagColor}.600`}
                    fontWeight="semibold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {accelerator.author}
                  </Link>
                </HStack>
                <HStack spacing={1}>
                  <Icon as={StarIcon} color="yellow.400" boxSize={3} />
                  <Text fontSize="xs" color="gray.500">
                    {Math.floor(Math.random() * 1000) + 10}
                  </Text>
                </HStack>
              </Flex>
            </Box>
          )}
        </VStack>
      </MotionBox>

      {/* Cost Breakdown Modal */}
      <CostBreakdownModal
        isOpen={isCostModalOpen}
        onClose={() => setIsCostModalOpen(false)}
        title={accelerator.title}
        tags={accelerator.tags}
      />
    </>
  );
};
