/**
 * Azure Cost Calculation Service
 * Provides estimated monthly costs for different solution accelerator deployments
 */

// Base service costs per month in USD
export interface ServiceCosts {
  [key: string]: {
    small: number;
    medium: number;
    large: number;
  };
}

// Standard service costs per month
const serviceCosts: ServiceCosts = {
  'Azure OpenAI': {
    small: 45,    // Basic tier (~100K tokens/day)
    medium: 150,  // Standard tier (~500K tokens/day)
    large: 400,   // Premium tier (~2M tokens/day)
  },
  'Azure AI Search': {
    small: 75,    // Basic tier
    medium: 250,  // Standard tier
    large: 800,   // Storage optimized tier
  },
  'Azure Functions': {
    small: 15,    // Consumption plan (~1M executions)
    medium: 70,   // Premium plan (~5M executions)
    large: 150,   // Dedicated plan (high throughput)
  },
  'Azure Blob Storage': {
    small: 5,     // ~100GB storage
    medium: 20,   // ~500GB storage
    large: 50,    // ~2TB storage
  },
  'Azure Cosmos DB': {
    small: 30,    // ~10 RU/s provisioned
    medium: 150,  // ~100 RU/s provisioned
    large: 500,   // ~1000 RU/s provisioned
  },
  'Azure SQL Database': {
    small: 20,    // Basic tier
    medium: 80,   // Standard tier
    large: 300,   // Premium tier
  },
  'Azure Cache for Redis': {
    small: 15,    // Basic C0
    medium: 55,   // Standard C1
    large: 180,   // Premium P1
  },
  'Azure Machine Learning': {
    small: 35,    // Basic compute
    medium: 120,  // Standard compute
    large: 450,   // GPU compute
  },
  'Azure Cognitive Services': {
    small: 30,    // S0 tier
    medium: 100,  // S1 tier
    large: 300,   // S2 tier
  },
  'Azure Bot Service': {
    small: 10,    // Basic usage
    medium: 50,   // Standard usage
    large: 200,   // Premium usage
  },
  'Application Insights': {
    small: 5,     // Basic monitoring
    medium: 20,   // Standard monitoring
    large: 60,    // Advanced monitoring
  },
  'Key Vault': {
    small: 3,     // Standard operations
    medium: 10,   // Higher operations
    large: 25,    // Premium operations
  },
  'Azure Entra ID': {
    small: 0,     // Free tier
    medium: 5,    // P1 tier (~basic premium features)
    large: 15,    // P2 tier (~advanced premium features)
  },
  // Add other services as needed
};

/**
 * Calculate the estimated monthly Azure cost for a solution accelerator
 * @param tags List of Azure services used in the accelerator
 * @param size Deployment size: small, medium, or large
 * @returns Estimated monthly cost in USD
 */
export const calculateMonthlyCost = (
  tags: string[], 
  size: 'small' | 'medium' | 'large'
): number => {
  let totalCost = 0;
  
  // Filter tags to only include Azure services we have pricing for
  const serviceTags = tags.filter(tag => serviceCosts[tag]);
  
  // Add up costs for each service
  serviceTags.forEach(service => {
    totalCost += serviceCosts[service][size];
  });
  
  // If no matching services found, use a default baseline cost
  if (totalCost === 0) {
    const baselineCosts = {
      small: 25,
      medium: 100,
      large: 350
    };
    totalCost = baselineCosts[size];
  }
  
  return totalCost;
};

/**
 * Get a detailed breakdown of estimated costs per service
 * @param tags List of Azure services used in the accelerator
 * @param size Deployment size: small, medium, or large
 * @returns Object with service names and their costs
 */
export const getDetailedCostBreakdown = (
  tags: string[],
  size: 'small' | 'medium' | 'large'
): { service: string; cost: number }[] => {
  const breakdown: { service: string; cost: number }[] = [];
  
  // Filter tags to only include Azure services we have pricing for
  const serviceTags = tags.filter(tag => serviceCosts[tag]);
  
  // Create breakdown entries
  serviceTags.forEach(service => {
    breakdown.push({
      service,
      cost: serviceCosts[service][size]
    });
  });
  
  // Add a default entry if no services matched
  if (breakdown.length === 0) {
    breakdown.push({
      service: 'Base Azure Infrastructure',
      cost: size === 'small' ? 25 : size === 'medium' ? 100 : 350
    });
  }
  
  return breakdown;
};

/**
 * Get a description of what's included in each size tier
 */
export const getSizeDescription = (size: 'small' | 'medium' | 'large'): string => {
  switch (size) {
    case 'small':
      return 'Basic deployment suitable for testing, development, or small teams (1-10 users)';
    case 'medium':
      return 'Standard deployment for production use with moderate traffic (10-100 users)';
    case 'large':
      return 'Enterprise-grade deployment for high traffic, large datasets, or critical workloads (100+ users)';
  }
};