import React from 'react';
import { Box, Wrap, WrapItem, Tag, TagLabel, TagCloseButton, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionTag = motion(Tag);

interface FilterSectionProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ selectedTags, onTagToggle }) => {
  const availableTags = [
    'Azure OpenAI',
    'Azure AI Search',
    'Azure Cognitive Services',
    'Azure AI Foundry',
    'AI Agents',
    'Azure Functions',
    'Vector Search',
    'LangChain',
    'Azure Machine Learning',
    'Azure Bot Service',
    'Document Processing'
  ];

  return (
    <Box mb={8}>
      <Heading size="sm" mb={4} color="gray.700">
        Filter by Technology
      </Heading>
      <Wrap spacing={3}>
        {availableTags.map((tag) => (
          <WrapItem key={tag}>
            <MotionTag
              size="lg"
              borderRadius="full"
              variant={selectedTags.includes(tag) ? "solid" : "subtle"}
              colorScheme="brand"
              cursor="pointer"
              onClick={() => onTagToggle(tag)}
              whileTap={{ scale: 0.95 }}
              whileHover={{
                y: -2,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 500 }}
              px={4}
              py={2}
              fontWeight="medium"
              opacity={selectedTags.length > 0 && !selectedTags.includes(tag) ? 0.6 : 1}
            >
              <TagLabel>{tag}</TagLabel>
              {selectedTags.includes(tag) && (
                <TagCloseButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagToggle(tag);
                  }}
                  ml={2}
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.2)'
                  }}
                />
              )}
            </MotionTag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
