import React, { useMemo, useState } from 'react';
import { SimpleGrid, Text, VStack, Box, Button, Textarea, Badge, HStack } from '@chakra-ui/react';
import { AcceleratorCard } from './AcceleratorCard';

interface AcceleratorListProps {
  searchQuery: string;
  selectedTags: string[];
}

interface Accelerator {
  title: string;
  description: string;
  tags: string[];
  url: string;
}

interface ScoredAccelerator extends Accelerator {
  score: number;
}

export const AcceleratorList = ({ searchQuery, selectedTags }: AcceleratorListProps) => {
  const [useCaseDescription, setUseCaseDescription] = useState('');
  const [recommendedAccelerators, setRecommendedAccelerators] = useState<Accelerator[]>([]);

  const accelerators: Accelerator[] = [
    {
      title: 'Business Process Automation Accelerator',
      description: 'A no-code AI pipeline builder that lets users drag-and-drop to create multi-stage AI workflows across Azure services. It integrates Azure Cognitive Services and Azure ML into unified pipelines, with results stored in Azure Blob Storage.',
      tags: ['Azure OpenAI', 'Azure Cognitive Services', 'Azure Machine Learning', 'Azure Blob Storage', 'Azure Functions', 'Azure Logic Apps', 'Application Insights', 'Key Vault'],
      url: 'https://github.com/Azure/business-process-automation',
    },
    {
      title: 'Azure Search + OpenAI Demo (RAG Chat App)',
      description: 'A Retrieval-Augmented Generation (RAG) sample that combines Azure OpenAI\'s GPT model with Azure Cognitive Search to create ChatGPT-style Q&A over private data.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Azure Speech Service', 'Azure Computer Vision', 'Azure Entra ID', 'Application Insights', 'RAG Pattern', 'Vector Search', 'Cognitive Search'],
      url: 'https://github.com/Azure-Samples/azure-search-openai-demo',
    },
    {
      title: 'Power Apps + Azure OpenAI Integration',
      description: 'A solution showing how to integrate Azure OpenAI\'s text-generation capabilities into Power Platform apps, enabling AI-driven responses in low-code business applications.',
      tags: ['Azure OpenAI', 'Power Apps', 'Power Automate', 'Power Platform', 'Microsoft Dataverse', 'Custom Connectors'],
      url: 'https://nanddeepnachanblogs.com/posts/2023-06-08-azure-openai-chat-completion-api-power-apps/',
    },
    {
      title: 'SqlGPT – ChatGPT with SQL',
      description: 'A database assistant that uses Azure OpenAI to enable natural language Q&A over data in SQL Server/Azure SQL, with the GPT model planning actions and refining queries.',
      tags: ['Azure OpenAI', 'Azure SQL Database', 'LangChain', 'SQL Server', 'Natural Language to SQL', 'Application Insights'],
      url: 'https://github.com/louis-li/SqlGPT',
    },
    {
      title: 'Enterprise ChatGPT',
      description: 'A sample application that uses Azure Cognitive Search for information retrieval combined with Azure OpenAI models to power ChatGPT-like Q&A experiences on enterprise data.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Azure Entra ID', 'Application Insights', 'Key Vault', 'Azure App Service', 'Vector Search'],
      url: 'https://github.com/lordlinus/Enterprise-ChatGPT',
    },
    {
      title: 'Azure OpenAI Semantic Search Demo',
      description: 'A community-driven demo that showcases semantic vector search over documents with abstractive answers, allowing users to upload their own documents and ask questions.',
      tags: ['Azure OpenAI', 'Vector Search', 'Document Processing', 'Azure Blob Storage', 'Azure Cognitive Search', 'Application Insights'],
      url: 'https://github.com/MaheshSQL/openai-vector-search-demo',
    },
    {
      title: 'PdfGPT (Azure OpenAI + Redis)',
      description: 'A Q&A bot that demonstrates chat over PDF documents using Azure OpenAI, with documents indexed and stored in Redis as a vector store.',
      tags: ['Azure OpenAI', 'Azure Cache for Redis', 'Vector Search', 'PDF Processing', 'Document Intelligence', 'Application Insights'],
      url: 'https://github.com/louis-li/PdfGPT',
    },
    {
      title: 'Chat with your data Solution Accelerator',
      description: 'An official end-to-end accelerator for conversational search on private data, combining Azure AI Search and Azure OpenAI GPT models with support for various file types.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Azure Blob Storage', 'Azure Functions', 'Azure Cognitive Services', 'Azure Bot Service', 'Application Insights', 'RAG Pattern', 'Vector Search'],
      url: 'https://github.com/Azure-Samples/chat-with-your-data-solution-accelerator',
    },
    {
      title: 'AI Multi-Agent System Accelerator',
      description: 'A hands-on multi-agent architecture using Azure services to build intelligent agents working together, supporting multi-channel chat via web, Teams, SMS, and email.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Azure Bot Framework', 'Azure SQL', 'Azure Cosmos DB', 'LangChain', 'AI Agents', 'Teams Integration', 'Application Insights'],
      url: 'https://github.com/MSUSAzureAccelerators/Azure-Cognitive-Search-Azure-OpenAI-Accelerator',
    },
    {
      title: 'Azure AI Foundry – Agent Service Demo Kit',
      description: 'A Streamlit-based demo showcasing Azure AI Foundry\'s Agent Service capabilities like Code Interpreter and live Bing search integration.',
      tags: ['Azure AI Foundry', 'Azure OpenAI', 'Bing Search', 'AI Agents', 'Code Interpreter', 'Application Insights'],
      url: 'https://github.com/LazaUK/AIFoundry-AgentService-Streamlit',
    },
    {
      title: 'Multi-Agent Custom Automation Engine',
      description: 'An official Azure solution accelerator for an AI-driven orchestration system managing multiple agents using the AutoGen framework with Azure OpenAI and Azure Cosmos DB.',
      tags: ['Azure OpenAI', 'Azure Cosmos DB', 'AutoGen'],
      url: 'https://github.com/microsoft/Solution-Accelerators',
    },
    {
      title: 'Document Generation Copilot',
      description: 'An accelerator that helps build AI assistants capable of document search and content generation, with support for formatted Word document outputs.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Microsoft 365'],
      url: 'https://github.com/microsoft/Solution-Accelerators',
    },
    {
      title: 'Enterprise AI Agent Service Demo',
      description: 'A comprehensive demo showcasing Azure AI Agent Service in an enterprise setting, demonstrating advanced capabilities like function calling, memory management, and integration with enterprise systems.',
      tags: ['Azure OpenAI', 'Azure AI Agent Service', 'Enterprise Integration'],
      url: 'https://github.com/Azure-Samples/azure-ai-agent-service-enterprise-demo',
    },
    {
      title: 'Ally Legal Assistant',
      description: 'An AI-powered legal assistant that helps with legal document analysis, contract review, and legal research using Azure OpenAI and other Azure AI services.',
      tags: ['Azure OpenAI', 'Legal AI', 'Document Processing'],
      url: 'https://github.com/Azure-Samples/ally-legal-assistant',
    },
    {
      title: 'Azure SQL DB Chatbot',
      description: 'A chatbot that interfaces with Azure SQL Database, allowing natural language queries and database operations through conversational AI.',
      tags: ['Azure OpenAI', 'Azure SQL Database', 'Chatbot'],
      url: 'https://github.com/Azure-Samples/azure-sql-db-chatbot',
    },
    {
      title: 'Azure OpenAI Chat Baseline Landing Zone',
      description: 'A reference architecture and implementation for deploying Azure OpenAI chat applications in an enterprise environment with security, compliance, and governance considerations.',
      tags: ['Azure OpenAI', 'Enterprise Architecture', 'Security'],
      url: 'https://github.com/Azure-Samples/azure-openai-chat-baseline-landing-zone',
    },
    {
      title: 'AI Travel Agent',
      description: 'A Python-based AI travel agent demonstrating how to build intelligent travel planning assistants using Azure AI services.',
      tags: ['Azure OpenAI', 'Python', 'Travel Planning'],
      url: 'https://github.com/Azure-Samples/azureai-travel-agent-python',
    },
    {
      title: 'Getting Started with AI Agents',
      description: 'A starter kit for building AI agents, showcasing fundamental concepts and best practices for implementing conversational AI agents.',
      tags: ['Azure OpenAI', 'AI Agents', 'Getting Started'],
      url: 'https://github.com/Azure-Samples/get-started-with-ai-agents',
    },
    {
      title: 'Contoso Chat',
      description: 'A reference implementation of an enterprise chat application using Azure OpenAI, demonstrating best practices for building secure and scalable chat solutions.',
      tags: ['Azure OpenAI', 'Enterprise Chat', 'Security'],
      url: 'https://github.com/Azure-Samples/contoso-chat',
    },
    {
      title: 'Contoso Creative Writer',
      description: 'An AI-powered creative writing assistant that helps generate, edit, and enhance various types of content using Azure OpenAI services.',
      tags: ['Azure OpenAI', 'Content Generation', 'Creative Writing'],
      url: 'https://github.com/Azure-Samples/contoso-creative-writer',
    },
    {
      title: 'Azure Search OpenAI Demo (JavaScript)',
      description: 'A JavaScript implementation of the Azure Search OpenAI demo, showcasing how to build RAG applications using TypeScript and React.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'JavaScript', 'TypeScript', 'React'],
      url: 'https://github.com/Azure-Samples/azure-search-openai-javascript',
    },
    {
      title: 'Azure Search OpenAI Demo (C#)',
      description: 'A C# implementation of the Azure Search OpenAI demo, demonstrating enterprise search and RAG patterns using .NET technologies.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'C#', '.NET'],
      url: 'https://github.com/Azure-Samples/azure-search-openai-demo-csharp',
    },
    {
      title: 'Azure Search OpenAI Demo (Java)',
      description: 'A Java implementation of the Azure Search OpenAI demo, showing how to implement RAG patterns using Spring Boot.',
      tags: ['Azure OpenAI', 'Azure AI Search', 'Java', 'Spring Boot'],
      url: 'https://github.com/Azure-Samples/azure-search-openai-demo-java',
    },
    {
      title: 'Azure AI Assistant Tool',
      description: 'A tool for building AI assistants with Azure OpenAI, featuring customizable skills and integration capabilities.',
      tags: ['Azure OpenAI', 'AI Assistant', 'Tool Integration'],
      url: 'https://github.com/Azure-Samples/azureai-assistant-tool',
    },
    {
      title: 'AI Studio Copilot Sample',
      description: 'A sample application demonstrating how to build copilot experiences using Azure AI Studio and Azure OpenAI.',
      tags: ['Azure OpenAI', 'AI Studio', 'Copilot Pattern'],
      url: 'https://github.com/Azure/aistudio-copilot-sample',
    },
    {
      title: 'Azure AI Studio Secure Bicep',
      description: 'Infrastructure as Code templates for deploying secure Azure AI Studio environments using Bicep.',
      tags: ['Azure OpenAI', 'AI Studio', 'Bicep', 'Security'],
      url: 'https://github.com/Azure-Samples/azure-ai-studio-secure-bicep',
    },
    {
      title: 'Call Center Intelligence Accelerator',
      description: 'An AI-powered solution for enhancing call center operations with speech analytics, sentiment analysis, and intelligent insights.',
      tags: ['Azure OpenAI', 'Speech Services', 'Analytics', 'Call Center'],
      url: 'https://github.com/MSUSAzureAccelerators/AI-Powered-Call-Center-Intelligence-Accelerator',
    },
    {
      title: 'Azure AI App Builder',
      description: 'A toolkit for rapidly building AI-powered applications using Azure services and best practices.',
      tags: ['Azure OpenAI', 'App Development', 'RAG Pattern'],
      url: 'https://github.com/robrita/Azure-AI-App-Builder',
    },
    {
      title: 'AI Gateway',
      description: 'A gateway solution for managing and securing access to AI services in enterprise environments.',
      tags: ['Azure OpenAI', 'API Gateway', 'Security'],
      url: 'https://github.com/Azure-Samples/AI-Gateway',
    },
    {
      title: 'GPT-RAG Reference Implementation',
      description: 'A comprehensive reference implementation for building Retrieval-Augmented Generation systems using Azure services.',
      tags: ['Azure OpenAI', 'RAG Pattern', 'Vector Search'],
      url: 'https://github.com/Azure/GPT-RAG',
    },
    {
      title: 'Introduction to Intelligent Applications',
      description: 'A comprehensive guide and sample implementation for building intelligent applications using Azure OpenAI and other Azure AI services.',
      tags: ['Azure OpenAI', 'Getting Started', 'Best Practices', 'RAG Pattern'],
      url: 'https://github.com/Azure/intro-to-intelligent-apps',
    },
    {
      title: 'OpenAI End-to-End Baseline',
      description: 'A baseline implementation for enterprise-grade OpenAI applications, covering security, monitoring, and best practices.',
      tags: ['Azure OpenAI', 'Enterprise Architecture', 'Security', 'Monitoring'],
      url: 'https://github.com/Azure-Samples/openai-end-to-end-baseline',
    },
    {
      title: 'Azure OpenAI Landing Zone',
      description: 'Reference architecture and implementation for deploying Azure OpenAI in enterprise environments with proper governance and security controls.',
      tags: ['Azure OpenAI', 'Landing Zone', 'Enterprise Architecture', 'Security'],
      url: 'https://github.com/Azure/azure-openai-landing-zone',
    },
    {
      title: 'Azure OpenAI Document Indexer',
      description: 'A tool for efficiently indexing and processing documents for use with Azure OpenAI, supporting various document formats.',
      tags: ['Azure OpenAI', 'Document Processing', 'Indexing', 'RAG Pattern'],
      url: 'https://github.com/FreddyAyala/aoai-document-indexer',
    },
    {
      title: 'AI-Powered Call Center Intelligence',
      description: 'A solution for enhancing call center operations with AI capabilities including transcription, analytics, and insights.',
      tags: ['Azure OpenAI', 'Speech Services', 'Analytics', 'Call Center'],
      url: 'https://github.com/amulchapla/AI-Powered-Call-Center-Intelligence',
    },
    {
      title: 'Azure Search Power Skills',
      description: 'A collection of useful custom skills for Azure Cognitive Search pipelines, enhancing search capabilities with AI.',
      tags: ['Azure AI Search', 'Custom Skills', 'Cognitive Skills'],
      url: 'https://github.com/Azure-Samples/azure-search-power-skills',
    },
    {
      title: 'Azure Search Comparison Tool',
      description: 'A tool for comparing different search approaches and configurations in Azure Cognitive Search to optimize results.',
      tags: ['Azure AI Search', 'Search Optimization', 'Evaluation'],
      url: 'https://github.com/Azure-Samples/azure-search-comparison-tool',
    },
  ];

  const getRecommendations = (description: string): Accelerator[] => {
    const keywords = description.toLowerCase().split(' ');
    const scored = accelerators.map((acc: Accelerator): ScoredAccelerator => {
      let score = 0;
      const text = `${acc.title} ${acc.description} ${acc.tags.join(' ')}`.toLowerCase();
      keywords.forEach(keyword => {
        if (text.includes(keyword)) score += 1;
      });
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

  const filteredAccelerators = useMemo(() => {
    return accelerators.filter(accelerator => {
      const matchesSearch = searchQuery === '' ||
        accelerator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accelerator.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accelerator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => accelerator.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  return (
    <VStack spacing={6} width="100%">
      <Box position="absolute" top="4" right="4">
        <Badge colorScheme="blue" fontSize="md" p={2} borderRadius="md">
          {filteredAccelerators.length} Solutions
        </Badge>
      </Box>

      <Box width="100%" p={4} borderWidth="1px" borderRadius="lg">
        <VStack spacing={3}>
          <Text fontSize="lg" fontWeight="bold">Get Recommendations (Beta)</Text>
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

        {recommendedAccelerators.length > 0 && (
          <VStack mt={4} align="stretch" spacing={4}>
            <Text fontWeight="bold">Recommended Solutions:</Text>
            {recommendedAccelerators.map((acc) => (
              <AcceleratorCard key={acc.url} accelerator={acc} />
            ))}
          </VStack>
        )}
      </Box>

      {filteredAccelerators.length === 0 ? (
        <VStack spacing={4} mt={8}>
          <Text fontSize="lg" color="gray.600">
            No accelerators found matching your criteria.
          </Text>
        </VStack>
      ) : (
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={6}
          mt={4}
          width="100%"
        >
          {filteredAccelerators.map((accelerator) => (
            <AcceleratorCard key={accelerator.url} accelerator={accelerator} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};
