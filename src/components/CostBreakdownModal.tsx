import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Badge,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Divider,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { getDetailedCostBreakdown, calculateMonthlyCost, getSizeDescription } from '../services/costCalculationService';

interface CostBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tags: string[];
}

export const CostBreakdownModal: React.FC<CostBreakdownModalProps> = ({
  isOpen,
  onClose,
  title,
  tags,
}) => {
  const smallBreakdown = getDetailedCostBreakdown(tags, 'small');
  const mediumBreakdown = getDetailedCostBreakdown(tags, 'medium');
  const largeBreakdown = getDetailedCostBreakdown(tags, 'large');

  const smallTotal = calculateMonthlyCost(tags, 'small');
  const mediumTotal = calculateMonthlyCost(tags, 'medium');
  const largeTotal = calculateMonthlyCost(tags, 'large');

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgHover = useColorModeValue('gray.50', 'gray.700');
  
  const renderBreakdownTable = (breakdown: { service: string; cost: number }[], total: number, size: 'small' | 'medium' | 'large') => (
    <Box>
      <Text fontSize="sm" mb={4}>
        {getSizeDescription(size)}
      </Text>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Azure Service</Th>
            <Th isNumeric>Monthly Cost (USD)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {breakdown.map((item, index) => (
            <Tr 
              key={item.service + index}
              _hover={{ bg: bgHover }}
            >
              <Td py={2}>{item.service}</Td>
              <Td isNumeric py={2}>${item.cost.toFixed(2)}</Td>
            </Tr>
          ))}
          <Tr fontWeight="bold">
            <Td borderTop="1px" borderColor={borderColor} py={3}>Total Estimated Cost</Td>
            <Td isNumeric borderTop="1px" borderColor={borderColor} py={3}>${total.toFixed(2)}</Td>
          </Tr>
        </Tbody>
      </Table>
      
      <Box mt={4} p={3} bg="blue.50" borderRadius="md">
        <Text fontSize="sm" color="blue.600">
          <strong>Note:</strong> These cost estimates are approximate and may vary based on actual usage patterns, regions, and specific configurations.
        </Text>
      </Box>
    </Box>
  );
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack align="start" spacing={1}>
            <Text>Cost Estimate for</Text>
            <Heading size="md" color="blue.600">{title}</Heading>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Box mb={4}>
            <Heading size="xs" mb={2}>Azure Services Used</Heading>
            <HStack wrap="wrap" spacing={2}>
              {tags.map((tag) => (
                <Badge key={tag} colorScheme="blue" py={1} px={2}>
                  {tag}
                </Badge>
              ))}
            </HStack>
          </Box>
          
          <Divider my={4} />
          
          <Tabs isFitted colorScheme="blue" variant="enclosed">
            <TabList mb={4}>
              <Tab>Small <Badge ml={1} colorScheme="green">${smallTotal}</Badge></Tab>
              <Tab>Medium <Badge ml={1} colorScheme="blue">${mediumTotal}</Badge></Tab>
              <Tab>Large <Badge ml={1} colorScheme="purple">${largeTotal}</Badge></Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {renderBreakdownTable(smallBreakdown, smallTotal, 'small')}
              </TabPanel>
              <TabPanel>
                {renderBreakdownTable(mediumBreakdown, mediumTotal, 'medium')}
              </TabPanel>
              <TabPanel>
                {renderBreakdownTable(largeBreakdown, largeTotal, 'large')}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};