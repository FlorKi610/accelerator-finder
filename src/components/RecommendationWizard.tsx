import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Select,
  Textarea,
  useBreakpointValue,
  Flex,
  Badge
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@chakra-ui/icons';

// Define the recommendation wizard props
interface RecommendationWizardProps {
  onComplete: (recommendations: any[]) => void;
  accelerators: any[];
}

export const RecommendationWizard: React.FC<RecommendationWizardProps> = ({ onComplete, accelerators }) => {
  const [step, setStep] = useState(1);
  const [projectSize, setProjectSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [primaryGoal, setPrimaryGoal] = useState<string>('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [additionalContext, setAdditionalContext] = useState<string>('');
  const [timeframe, setTimeframe] = useState<string>('');
  
  const totalSteps = 5;
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  
  // Extract all unique tags from the accelerators for technology selection
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    accelerators.forEach(acc => {
      acc.tags.forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [accelerators]);
  
  const getRecommendations = () => {
    // Create a scoring system for accelerators based on the user's inputs
    const scored = accelerators.map(acc => {
      let score = 0;
      
      // Project size match
      if (acc.useCase) {
        score += (acc.useCase[projectSize] / 20); // Normalize to a reasonable score
      }
      
      // Primary goal match
      if (primaryGoal) {
        const goalKeywords = primaryGoal.toLowerCase().split(' ');
        const accText = `${acc.title} ${acc.description}`.toLowerCase();
        
        goalKeywords.forEach(keyword => {
          if (keyword.length > 3 && accText.includes(keyword)) score += 1;
        });
      }
      
      // Technology match (higher weight)
      selectedTechnologies.forEach(tech => {
        if (acc.tags.includes(tech)) score += 3;
      });
      
      // Additional context match
      if (additionalContext) {
        const contextKeywords = additionalContext.toLowerCase().split(' ');
        const accText = `${acc.title} ${acc.description} ${acc.tags.join(' ')}`.toLowerCase();
        
        contextKeywords.forEach(keyword => {
          if (keyword.length > 3 && accText.includes(keyword)) score += 0.5;
        });
      }
      
      // Timeframe preference (boost quick implementation options for urgent timeframes)
      if (timeframe === 'urgent') {
        if (acc.tags.some((tag: string) => 
          tag.includes('Sample') || 
          tag.includes('Starter') || 
          tag.includes('Getting Started'))) {
          score += 2;
        }
      }
      
      return { ...acc, score };
    });
    
    // Return top recommendations sorted by score
    return scored
      .filter(acc => acc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final step - calculate and return recommendations
      const recommendations = getRecommendations();
      onComplete(recommendations);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <VStack spacing={6} align="start" width="100%">
            <Heading size="md">Step 1: Project Scope</Heading>
            <Text>What is the size of your project or implementation?</Text>
            <RadioGroup onChange={(value) => setProjectSize(value as 'small' | 'medium' | 'large')} value={projectSize}>
              <VStack align="start" spacing={3}>
                <Radio value="small">
                  <Box>
                    <Text fontWeight="medium">Small Project</Text>
                    <Text fontSize="sm" color="gray.600">Proof of concept, hobby project, or small team implementation</Text>
                  </Box>
                </Radio>
                <Radio value="medium">
                  <Box>
                    <Text fontWeight="medium">Medium Project</Text>
                    <Text fontSize="sm" color="gray.600">Department-level solution or standard business application</Text>
                  </Box>
                </Radio>
                <Radio value="large">
                  <Box>
                    <Text fontWeight="medium">Large Enterprise Project</Text>
                    <Text fontSize="sm" color="gray.600">Organization-wide implementation or complex enterprise solution</Text>
                  </Box>
                </Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        );
      
      case 2:
        return (
          <VStack spacing={6} align="start" width="100%">
            <Heading size="md">Step 2: Primary Goal</Heading>
            <Text>What is the main objective of your solution?</Text>
            <Select 
              placeholder="Select your primary goal" 
              value={primaryGoal} 
              onChange={e => setPrimaryGoal(e.target.value)}
              aria-label="Primary goal selection"
              title="Primary goal selection"
            >
              <option value="Document processing and search">Document processing and search</option>
              <option value="Conversational AI or chatbot">Conversational AI or chatbot</option>
              <option value="Data analysis and insights">Data analysis and insights</option>
              <option value="Content generation">Content generation</option>
              <option value="Enterprise security and governance">Enterprise security and governance</option>
              <option value="Voice and speech processing">Voice and speech processing</option>
              <option value="Image and video processing">Image and video processing</option>
              <option value="Integration with existing systems">Integration with existing systems</option>
              <option value="AI agent development">AI agent development</option>
              <option value="End-to-end application">End-to-end application</option>
            </Select>
            <Text fontSize="sm" color="gray.600">
              This helps us identify accelerators that align with your main project objectives.
            </Text>
          </VStack>
        );
      
      case 3:
        return (
          <VStack spacing={6} align="start" width="100%">
            <Heading size="md">Step 3: Technology Stack</Heading>
            <Text>Which Azure technologies are you most interested in using? (Select all that apply)</Text>
            <Box maxH="300px" overflowY="auto" width="100%" pr={2}>
              <CheckboxGroup 
                colorScheme="blue" 
                value={selectedTechnologies}
                onChange={(values) => setSelectedTechnologies(values as string[])}
              >
                <VStack align="start" spacing={1}>
                  {allTags.map((tag) => (
                    <Checkbox key={tag} value={tag}>
                      {tag}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Box>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Select the technologies that you're most interested in or already using.
            </Text>
          </VStack>
        );
      
      case 4:
        return (
          <VStack spacing={6} align="start" width="100%">
            <Heading size="md">Step 4: Implementation Timeline</Heading>
            <Text>What's your expected implementation timeline?</Text>
            <RadioGroup onChange={setTimeframe} value={timeframe}>
              <VStack align="start" spacing={3}>
                <Radio value="urgent">
                  <Box>
                    <Text fontWeight="medium">Urgent (Days)</Text>
                    <Text fontSize="sm" color="gray.600">Need a quick solution to implement right away</Text>
                  </Box>
                </Radio>
                <Radio value="standard">
                  <Box>
                    <Text fontWeight="medium">Standard (Weeks)</Text>
                    <Text fontSize="sm" color="gray.600">Have a reasonable timeframe for implementation</Text>
                  </Box>
                </Radio>
                <Radio value="extended">
                  <Box>
                    <Text fontWeight="medium">Extended (Months)</Text>
                    <Text fontSize="sm" color="gray.600">Planning a thorough implementation with customization</Text>
                  </Box>
                </Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        );
      
      case 5:
        return (
          <VStack spacing={6} align="start" width="100%">
            <Heading size="md">Step 5: Additional Details</Heading>
            <Text>Any specific requirements or context about your project?</Text>
            <Textarea
              placeholder="E.g., Need to integrate with existing SQL database, requires multilingual support, etc."
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              size="md"
              rows={4}
              aria-label="Additional project requirements"
            />
            <Text fontSize="sm" color="gray.600">
              This helps us fine-tune our recommendations to your specific needs.
            </Text>
          </VStack>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box 
      width="100%" 
      p={6} 
      borderWidth="1px" 
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
    >
      <VStack spacing={6} align="stretch">
        <HStack justifyContent="space-between">
          <Heading size="lg" color="blue.600">Solution Recommendation Wizard</Heading>
          <Badge colorScheme="blue" fontSize="md" py={1} px={2}>
            Step {step} of {totalSteps}
          </Badge>
        </HStack>

        <Progress 
          value={(step / totalSteps) * 100} 
          size="sm" 
          colorScheme="blue" 
          borderRadius="full" 
        />

        <Box pt={4}>
          {renderStepContent()}
        </Box>

        <Flex justify="space-between" mt={6}>
          <Button
            leftIcon={<ChevronLeftIcon />}
            onClick={handlePreviousStep}
            isDisabled={step === 1}
            size={buttonSize}
            variant="outline"
          >
            Previous
          </Button>
          
          <Button
            rightIcon={step === totalSteps ? <CheckIcon /> : <ChevronRightIcon />}
            onClick={handleNextStep}
            colorScheme="blue"
            size={buttonSize}
          >
            {step === totalSteps ? 'Get Recommendations' : 'Next'}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};