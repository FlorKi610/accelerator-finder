import React from 'react';
import { HStack, Tag, TagLabel, TagCloseButton, Wrap, WrapItem } from '@chakra-ui/react';

interface FilterSectionProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const FilterSection = ({ selectedTags, onTagToggle }: FilterSectionProps) => {
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
    <Wrap spacing={3} mb={6}>
      {availableTags.map((tag) => (
        <WrapItem key={tag}>
          <Tag
            size="lg"
            borderRadius="full"
            variant={selectedTags.includes(tag) ? "solid" : "subtle"}
            colorScheme="blue"
            cursor="pointer"
            onClick={() => onTagToggle(tag)}
            _hover={{
              transform: 'translateY(-2px)',
              shadow: 'md'
            }}
            transition="all 0.2s"
          >
            <TagLabel>{tag}</TagLabel>
            {selectedTags.includes(tag) && (
              <TagCloseButton onClick={(e) => {
                e.stopPropagation();
                onTagToggle(tag);
              }} />
            )}
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  );
};
