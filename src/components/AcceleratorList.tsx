import React, { useMemo, useState } from 'react';
import { SimpleGrid, Text, VStack, Box, Button, Textarea, Badge, HStack, Switch, FormControl, FormLabel, Collapse, Grid, GridItem } from '@chakra-ui/react';
import { AcceleratorCard } from './AcceleratorCard';
import { RecommendationWizard } from './RecommendationWizard';

interface AcceleratorListProps {
  searchQuery: string;
  selectedTags: string[];
}

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

interface ScoredAccelerator extends Accelerator {
  score: number;
}

export const AcceleratorList = ({ searchQuery, selectedTags }: AcceleratorListProps) => {
  const [useCaseDescription, setUseCaseDescription] = useState('');
  const [recommendedAccelerators, setRecommendedAccelerators] = useState<Accelerator[]>([]);
  const [useWizard, setUseWizard] = useState(false);
  const [wizardVisible, setWizardVisible] = useState(false);

  const accelerators: Accelerator[] = [
    {
      title: 'GPT-RAG',
      description: 'An official Azure implementation for Retrieval-Augmented Generation pattern using Azure OpenAI and Azure AI Search, with customizable components and deployment templates.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'RAG Pattern', 'Vector Search', 'Document Processing'],
      url: 'https://github.com/Azure/gpt-rag',
      author: 'Azure',
      useCase: {
        small: 80,
        medium: 95,
        large: 90
      }
    },
    {
      title: 'On-The-Road Copilot',
      description: 'A solution accelerator for building an in-car assistant using Azure OpenAI and various AI services, demonstrating voice-enabled interactions and real-time responses.',
      tags: ['Azure OpenAI', 'Speech Services', 'Azure Functions', 'AI Agents', 'Copilot Pattern'],
      url: 'https://github.com/Azure-Samples/on-the-road-copilot',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 85,
        large: 95
      }
    },
    {
      title: 'AI Search OpenAI RAG Audio',
      description: 'A solution combining Azure OpenAI with AI Search for Retrieval-Augmented Generation over audio content, enabling conversational Q&A on audio files.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'RAG Pattern', 'Audio Processing', 'Speech Services'],
      url: 'https://github.com/Azure-Samples/aisearch-openai-rag-audio',
      author: 'Azure-Samples',
      useCase: {
        small: 75,
        medium: 90,
        large: 85
      }
    },
    {
      title: 'Gen-CV',
      description: 'A generative computer vision solution accelerator leveraging Azure AI services to process, analyze, and generate insights from image data.',
      tags: ['Azure OpenAI', 'Computer Vision', 'Generative AI', 'Azure AI Services', 'Image Processing'],
      url: 'https://github.com/Azure/gen-cv',
      author: 'Azure',
      useCase: {
        small: 70,
        medium: 80,
        large: 95
      }
    },
    {
      title: 'Business Process Automation Accelerator',
      description: 'A no-code AI pipeline builder that lets users drag-and-drop to create multi-stage AI workflows across Azure services. It integrates Azure Cognitive Services and Azure ML into unified pipelines, with results stored in Azure Blob Storage.',
      tags: ['Azure OpenAI', 'Azure Cognitive Services', 'Azure Machine Learning', 'Azure Blob Storage', 'Azure Functions', 'Azure Logic Apps', 'Application Insights', 'Key Vault'],
      url: 'https://github.com/Azure/business-process-automation',
      author: 'Azure',
      useCase: {
        small: 60,
        medium: 85,
        large: 95
      }
    },
    {
      title: 'Azure Search + OpenAI Demo (RAG Chat App)',
      description: 'A Retrieval-Augmented Generation (RAG) sample that combines Azure OpenAI\'s GPT model with Azure Cognitive Search to create ChatGPT-style Q&A over private data.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Azure Speech Service', 'Azure Computer Vision', 'Azure Entra ID', 'Application Insights', 'RAG Pattern', 'Vector Search', 'Cognitive Search'],
      url: 'https://github.com/Azure-Samples/azure-search-openai-demo',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Power Apps + Azure OpenAI Integration',
      description: 'A solution showing how to integrate Azure OpenAI\'s text-generation capabilities into Power Platform apps, enabling AI-driven responses in low-code business applications.',
      tags: ['Azure OpenAI', 'Power Apps', 'Power Automate', 'Power Platform', 'Microsoft Dataverse', 'Custom Connectors'],
      url: 'https://nanddeepnachanblogs.com/posts/2023-06-08-azure-openai-chat-completion-api-power-apps/',
      author: 'nanddeepnachanblogs',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'SqlGPT – ChatGPT with SQL',
      description: 'A database assistant that uses Azure OpenAI to enable natural language Q&A over data in SQL Server/Azure SQL, with the GPT model planning actions and refining queries.',
      tags: ['Azure OpenAI', 'Azure SQL Database', 'LangChain', 'SQL Server', 'Natural Language to SQL', 'Application Insights'],
      url: 'https://github.com/louis-li/SqlGPT',
      author: 'louis-li',
      useCase: {
        small: 75,
        medium: 90,
        large: 85
      }
    },
    {
      title: 'Enterprise ChatGPT',
      description: 'A sample application that uses Azure Cognitive Search for information retrieval combined with Azure OpenAI models to power ChatGPT-like Q&A experiences on enterprise data.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Azure Entra ID', 'Application Insights', 'Key Vault', 'Azure App Service', 'Vector Search'],
      url: 'https://github.com/lordlinus/Enterprise-ChatGPT',
      author: 'lordlinus',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure OpenAI Semantic Search Demo',
      description: 'A community-driven demo that showcases semantic vector search over documents with abstractive answers, allowing users to upload their own documents and ask questions.',
      tags: ['Azure OpenAI', 'Vector Search', 'Document Processing', 'Azure Blob Storage', 'Azure Cognitive Search', 'Application Insights'],
      url: 'https://github.com/MaheshSQL/openai-vector-search-demo',
      author: 'MaheshSQL',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'PdfGPT (Azure OpenAI + Redis)',
      description: 'A Q&A bot that demonstrates chat over PDF documents using Azure OpenAI, with documents indexed and stored in Redis as a vector store.',
      tags: ['Azure OpenAI', 'Azure Cache for Redis', 'Vector Search', 'PDF Processing', 'Document Intelligence', 'Application Insights'],
      url: 'https://github.com/louis-li/PdfGPT',
      author: 'louis-li',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Chat with your data Solution Accelerator',
      description: 'An official end-to-end accelerator for conversational search on private data, combining Azure AI Search and Azure OpenAI GPT models with support for various file types.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Azure Blob Storage', 'Azure Functions', 'Azure Cognitive Services', 'Azure Bot Service', 'Application Insights', 'RAG Pattern', 'Vector Search'],
      url: 'https://github.com/Azure-Samples/chat-with-your-data-solution-accelerator',
      author: 'Azure-Samples',
      useCase: {
        small: 75,
        medium: 90,
        large: 95
      }
    },
    {
      title: 'AI Multi-Agent System Accelerator',
      description: 'A hands-on multi-agent architecture using Azure services to build intelligent agents working together, supporting multi-channel chat via web, Teams, SMS, and email.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Azure Bot Framework', 'Azure SQL', 'Azure Cosmos DB', 'LangChain', 'AI Agents', 'Teams Integration', 'Application Insights'],
      url: 'https://github.com/MSUSAzureAccelerators/Azure-Cognitive-Search-Azure-OpenAI-Accelerator',
      author: 'MSUSAzureAccelerators',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure AI Foundry – Agent Service Demo Kit',
      description: 'A Streamlit-based demo showcasing Azure AI Foundry\'s Agent Service capabilities like Code Interpreter and live Bing search integration.',
      tags: ['Azure AI Foundry', 'Azure OpenAI', 'Bing Search', 'AI Agents', 'Code Interpreter', 'Application Insights'],
      url: 'https://github.com/LazaUK/AIFoundry-AgentService-Streamlit',
      author: 'LazaUK',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Multi-Agent Custom Automation Engine',
      description: 'An official Azure solution accelerator for an AI-driven orchestration system managing multiple agents using the AutoGen framework with Azure OpenAI and Azure Cosmos DB.',
      tags: ['Azure OpenAI', 'Azure Cosmos DB', 'AutoGen'],
      url: 'https://github.com/microsoft/Solution-Accelerators',
      author: 'microsoft',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Document Generation Copilot',
      description: 'An accelerator that helps build AI assistants capable of document search and content generation, with support for formatted Word document outputs.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Microsoft 365'],
      url: 'https://github.com/microsoft/Solution-Accelerators',
      author: 'microsoft',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Enterprise AI Agent Service Demo',
      description: 'A comprehensive demo showcasing Azure AI Agent Service in an enterprise setting, demonstrating advanced capabilities like function calling, memory management, and integration with enterprise systems.',
      tags: ['Azure OpenAI', 'Azure AI Agent Service', 'Enterprise Integration'],
      url: 'https://github.com/Azure-Samples/azure-ai-agent-service-enterprise-demo',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Ally Legal Assistant',
      description: 'An AI-powered legal assistant that helps with legal document analysis, contract review, and legal research using Azure OpenAI and other Azure AI services.',
      tags: ['Azure OpenAI', 'Legal AI', 'Document Processing'],
      url: 'https://github.com/Azure-Samples/ally-legal-assistant',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Azure SQL DB Chatbot',
      description: 'A chatbot that interfaces with Azure SQL Database, allowing natural language queries and database operations through conversational AI.',
      tags: ['Azure OpenAI', 'Azure SQL Database', 'Chatbot'],
      url: 'https://github.com/Azure-Samples/azure-sql-db-chatbot',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure OpenAI Chat Baseline Landing Zone',
      description: 'A reference architecture and implementation for deploying Azure OpenAI chat applications in an enterprise environment with security, compliance, and governance considerations.',
      tags: ['Azure OpenAI', 'Enterprise Architecture', 'Security'],
      url: 'https://github.com/Azure-Samples/azure-openai-chat-baseline-landing-zone',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'AI Travel Agent',
      description: 'A Python-based AI travel agent demonstrating how to build intelligent travel planning assistants using Azure AI services.',
      tags: ['Azure OpenAI', 'Python', 'Travel Planning'],
      url: 'https://github.com/Azure-Samples/azureai-travel-agent-python',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Getting Started with AI Agents',
      description: 'A starter kit for building AI agents, showcasing fundamental concepts and best practices for implementing conversational AI agents.',
      tags: ['Azure OpenAI', 'AI Agents', 'Getting Started'],
      url: 'https://github.com/Azure-Samples/get-started-with-ai-agents',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Contoso Chat',
      description: 'A reference implementation of an enterprise chat application using Azure OpenAI, demonstrating best practices for building secure and scalable chat solutions.',
      tags: ['Azure OpenAI', 'Enterprise Chat', 'Security'],
      url: 'https://github.com/Azure-Samples/contoso-chat',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Contoso Creative Writer',
      description: 'An AI-powered creative writing assistant that helps generate, edit, and enhance various types of content using Azure OpenAI services.',
      tags: ['Azure OpenAI', 'Content Generation', 'Creative Writing'],
      url: 'https://github.com/Azure-Samples/contoso-creative-writer',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Azure Search OpenAI Demo (JavaScript)',
      description: 'A JavaScript implementation of the Azure Search OpenAI demo, showcasing how to build RAG applications using TypeScript and React.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'JavaScript', 'TypeScript', 'React'],
      url: 'https://github.com/Azure-Samples/azure-search-openai-javascript',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure Search OpenAI Demo (C#)',
      description: 'A C# implementation of the Azure Search OpenAI demo, demonstrating enterprise search and RAG patterns using .NET technologies.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'C#', '.NET'],
      url: 'https://github.com/Azure-Samples/azure-search-openai-demo-csharp',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Azure Search OpenAI Demo (Java)',
      description: 'A Java implementation of the Azure Search OpenAI demo, showing how to implement RAG patterns using Spring Boot.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Java', 'Spring Boot'],
      url: 'https://github.com/Azure-Samples/azure-search-openai-demo-java',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure AI Assistant Tool',
      description: 'A tool for building AI assistants with Azure OpenAI, featuring customizable skills and integration capabilities.',
      tags: ['Azure OpenAI', 'AI Assistant', 'Tool Integration'],
      url: 'https://github.com/Azure-Samples/azureai-assistant-tool',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'AI Studio Copilot Sample',
      description: 'A sample application demonstrating how to build copilot experiences using Azure AI Studio and Azure OpenAI.',
      tags: ['Azure OpenAI', 'AI Studio', 'Copilot Pattern'],
      url: 'https://github.com/Azure/aistudio-copilot-sample',
      author: 'Azure',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure AI Studio Secure Bicep',
      description: 'Infrastructure as Code templates for deploying secure Azure AI Studio environments using Bicep.',
      tags: ['Azure OpenAI', 'AI Studio', 'Bicep', 'Security'],
      url: 'https://github.com/Azure-Samples/azure-ai-studio-secure-bicep',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Call Center Intelligence Accelerator',
      description: 'An AI-powered solution for enhancing call center operations with speech analytics, sentiment analysis, and intelligent insights.',
      tags: ['Azure OpenAI', 'Speech Services', 'Analytics', 'Call Center'],
      url: 'https://github.com/MSUSAzureAccelerators/AI-Powered-Call-Center-Intelligence-Accelerator',
      author: 'MSUSAzureAccelerators',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure AI App Builder',
      description: 'A toolkit for rapidly building AI-powered applications using Azure services and best practices.',
      tags: ['Azure OpenAI', 'App Development', 'RAG Pattern'],
      url: 'https://github.com/robrita/Azure-AI-App-Builder',
      author: 'robrita',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'AI Gateway',
      description: 'A gateway solution for managing and securing access to AI services in enterprise environments.',
      tags: ['Azure OpenAI', 'API Gateway', 'Security'],
      url: 'https://github.com/Azure-Samples/AI-Gateway',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'GPT-RAG Reference Implementation',
      description: 'A comprehensive reference implementation for building Retrieval-Augmented Generation systems using Azure services.',
      tags: ['Azure OpenAI', 'RAG Pattern', 'Vector Search'],
      url: 'https://github.com/Azure/GPT-RAG',
      author: 'Azure',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Introduction to Intelligent Applications',
      description: 'A comprehensive guide and sample implementation for building intelligent applications using Azure OpenAI and other Azure AI services.',
      tags: ['Azure OpenAI', 'Getting Started', 'Best Practices', 'RAG Pattern'],
      url: 'https://github.com/Azure/intro-to-intelligent-apps',
      author: 'Azure',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'OpenAI End-to-End Baseline',
      description: 'A baseline implementation for enterprise-grade OpenAI applications, covering security, monitoring, and best practices.',
      tags: ['Azure OpenAI', 'Enterprise Architecture', 'Security', 'Monitoring'],
      url: 'https://github.com/Azure-Samples/openai-end-to-end-baseline',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'Azure OpenAI Landing Zone',
      description: 'Reference architecture and implementation for deploying Azure OpenAI in enterprise environments with proper governance and security controls.',
      tags: ['Azure OpenAI', 'Landing Zone', 'Enterprise Architecture', 'Security'],
      url: 'https://github.com/Azure/azure-openai-landing-zone',
      author: 'Azure',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure OpenAI Document Indexer',
      description: 'A tool for efficiently indexing and processing documents for use with Azure OpenAI, supporting various document formats.',
      tags: ['Azure OpenAI', 'Document Processing', 'Indexing', 'RAG Pattern'],
      url: 'https://github.com/FreddyAyala/aoai-document-indexer',
      author: 'FreddyAyala',
      useCase: {
        small: 65,
        medium: 80,
        large: 85
      }
    },
    {
      title: 'AI-Powered Call Center Intelligence',
      description: 'A solution for enhancing call center operations with AI capabilities including transcription, analytics, and insights.',
      tags: ['Azure OpenAI', 'Speech Services', 'Analytics', 'Call Center'],
      url: 'https://github.com/amulchapla/AI-Powered-Call-Center-Intelligence',
      author: 'amulchapla',
      useCase: {
        small: 70,
        medium: 85,
        large: 90
      }
    },
    {
      title: 'Azure Search Power Skills',
      description: 'A collection of useful custom skills for Azure Cognitive Search pipelines, enhancing search capabilities with AI.',
      tags: ['Azure AI Search', 'Custom Skills', 'Cognitive Skills'],
      url: 'https://github.com/Azure-Samples/azure-search-power-skills',
      author: 'Azure-Samples',
      useCase: {
        small: 65,
        medium: 80,
        large: 75
      }
    },
    {
      title: 'Azure Search Comparison Tool',
      description: 'A tool for comparing different search approaches and configurations in Azure Cognitive Search to optimize results.',
      tags: ['Azure AI Search', 'Search Optimization', 'Evaluation'],
      url: 'https://github.com/Azure-Samples/azure-search-comparison-tool',
      author: 'Azure-Samples',
      useCase: {
        small: 70,
        medium: 75,
        large: 65
      }
    },
  ];

  // Enhanced recommendation algorithm with use case sizing
  const getRecommendations = (description: string): Accelerator[] => {
    const keywords = description.toLowerCase().split(' ');
    const scored = accelerators.map((acc: Accelerator): ScoredAccelerator => {
      let score = 0;
      const text = `${acc.title} ${acc.description} ${acc.tags.join(' ')}`.toLowerCase();
      
      // Basic keyword matching
      keywords.forEach(keyword => {
        if (keyword.length > 3 && text.includes(keyword)) score += 1;
      });
      
      // Boost scores based on tag matching (tags are more important)
      keywords.forEach(keyword => {
        if (keyword.length > 3 && acc.tags.some(tag => tag.toLowerCase().includes(keyword))) {
          score += 2;
        }
      });
      
      // Calculate use case fit score
      let useCaseSize = 'medium';
      if (description.toLowerCase().includes('large') || 
          description.toLowerCase().includes('enterprise') || 
          description.toLowerCase().includes('complex')) {
        useCaseSize = 'large';
      } else if (description.toLowerCase().includes('small') || 
                description.toLowerCase().includes('simple') || 
                description.toLowerCase().includes('basic')) {
        useCaseSize = 'small';
      }
      
      // Add use case bonus if available
      if (acc.useCase) {
        const useCaseBonus = acc.useCase[useCaseSize as keyof typeof acc.useCase] / 20; // Scale to reasonable bonus
        score += useCaseBonus;
      }
      
      return { ...acc, score };
    });

    return scored
      .filter((acc: ScoredAccelerator) => acc.score > 0)
      .sort((a: ScoredAccelerator, b: ScoredAccelerator) => b.score - a.score)
      .slice(0, 3);
  };

  const handleRecommend = () => {
    if (useCaseDescription) {
      const recommendations = getRecommendations(useCaseDescription);
      setRecommendedAccelerators(recommendations);
    }
  };

  const handleWizardComplete = (recommendations: Accelerator[]) => {
    setRecommendedAccelerators(recommendations);
    setWizardVisible(false);
  };

  const toggleRecommendationMode = () => {
    setUseWizard(!useWizard);
    // Reset state when switching modes
    setUseCaseDescription('');
    setRecommendedAccelerators([]);
    setWizardVisible(false);
  };

  const filteredAccelerators = useMemo(() => {
    return accelerators.filter(accelerator => {
      const matchesSearch = searchQuery === '' ||
        accelerator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accelerator.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accelerator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (accelerator.author && accelerator.author.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => accelerator.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  return (
    <VStack spacing={6} width="100%" position="relative">
      <Grid templateColumns={{ base: '1fr', lg: '350px 1fr' }} gap={6} width="100%">
        {/* Left column: Recommendation wizard */}
        <GridItem>
          <Box p={4} borderWidth="1px" borderRadius="lg" position="sticky" top="4">
            <VStack spacing={3}>
              <HStack width="100%" justifyContent="space-between">
                <Text fontSize="lg" fontWeight="bold">Get Personalized Recommendations</Text>
                <FormControl display="flex" alignItems="center" width="auto">
                  <FormLabel htmlFor="recommendation-mode" mb="0" fontSize="sm" mr={2}>
                    Step-by-Step
                  </FormLabel>
                  <Switch id="recommendation-mode" isChecked={useWizard} onChange={toggleRecommendationMode} colorScheme="blue" />
                </FormControl>
              </HStack>
              
              {!useWizard ? (
                <VStack spacing={3} width="100%">
                  <Textarea
                    placeholder="Describe your use case (e.g., 'I need to build a chatbot that can search through my company documents')"
                    value={useCaseDescription}
                    onChange={(e) => setUseCaseDescription(e.target.value)}
                    size="sm"
                    rows={3}
                  />
                  <HStack spacing={2} width="100%">
                    <Button colorScheme="blue" onClick={handleRecommend} flex="1">
                      Get Recommendations
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setUseCaseDescription('');
                        setRecommendedAccelerators([]);
                      }}
                      isDisabled={!useCaseDescription && recommendedAccelerators.length === 0}
                    >
                      Clear
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <VStack spacing={3} width="100%">
                  <Text fontSize="sm" color="gray.600">
                    Our recommendation wizard will guide you through a series of questions to find your perfect solution accelerator.
                  </Text>
                  <Button 
                    colorScheme="blue" 
                    width="100%" 
                    onClick={() => setWizardVisible(!wizardVisible)}
                  >
                    {wizardVisible ? "Hide Wizard" : "Start Guided Recommendation"}
                  </Button>
                </VStack>
              )}

              <Collapse in={useWizard && wizardVisible} animateOpacity>
                <Box mt={4}>
                  <RecommendationWizard 
                    onComplete={handleWizardComplete} 
                    accelerators={accelerators} 
                  />
                </Box>
              </Collapse>

              {recommendedAccelerators.length > 0 && (
                <VStack mt={4} align="stretch" spacing={4}>
                  <Text fontWeight="bold">Recommended Solutions:</Text>
                  {recommendedAccelerators.map((acc) => (
                    <AcceleratorCard key={acc.url} accelerator={acc} />
                  ))}
                </VStack>
              )}
            </VStack>
          </Box>
        </GridItem>

        {/* Right column: All accelerators */}
        <GridItem>
          <Box position="relative" mb={4}>
            <Badge colorScheme="blue" fontSize="md" p={2} borderRadius="md">
              {filteredAccelerators.length} Solutions
            </Badge>
          </Box>
          
          {filteredAccelerators.length === 0 ? (
            <VStack spacing={4}>
              <Text fontSize="lg" color="gray.600">
                No accelerators found matching your criteria.
              </Text>
            </VStack>
          ) : (
            <SimpleGrid 
              columns={{ base: 1, xl: 2 }} 
              spacing={6}
              width="100%"
            >
              {filteredAccelerators.map((accelerator) => (
                <AcceleratorCard key={accelerator.url} accelerator={accelerator} />
              ))}
            </SimpleGrid>
          )}
        </GridItem>
      </Grid>
    </VStack>
  );
};
