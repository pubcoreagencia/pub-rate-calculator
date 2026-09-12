export function calculateRate(baseCpm, impressions, multiplier = 1.0) {
  if (baseCpm < 0 || impressions < 0) throw new Error('Invalid negative arguments');
  return ((baseCpm * impressions) / 1000) * multiplier;
}

export function calculateEnterpriseRate(baseCpm, impressions, enterpriseDiscount = 0) {
  if (baseCpm < 0 || impressions < 0) throw new Error('Invalid negative arguments');
  if (enterpriseDiscount < 0 || enterpriseDiscount > 100) throw new Error('Enterprise discount must be between 0 and 100');
  const grossRevenue = ((baseCpm * impressions) / 1000);
  const discountAmount = (grossRevenue * (enterpriseDiscount / 100));
  return grossRevenue - discountAmount;
}

export function validateEnterpriseConfiguration(config) {
  if (!config || typeof config !== 'object') throw new Error('Invalid configuration');
  if (!config.baseCpm || config.baseCpm < 0) throw new Error('Invalid baseCpm');
  if (!config.impressions || config.impressions < 0) throw new Error('Invalid impressions');
  if ('enterpriseDiscount' in config && (config.enterpriseDiscount < 0 || config.enterpriseDiscount > 100)) {
    throw new Error('Enterprise discount must be between 0 and 100');
  }
  return true;
}

export function calculateAgencyCommission(grossRevenue, commissionRate) {
  if (grossRevenue < 0 || commissionRate < 0 || commissionRate > 100) throw new Error('Invalid arguments for agency commission');
  return (grossRevenue * (commissionRate / 100));
}

export function calculateNetMargin(grossRevenue, costs) {
  if (grossRevenue < 0 || costs < 0) throw new Error('Invalid arguments for net margin calculation');
  return ((grossRevenue - costs) / grossRevenue) * 100;
}

export function calculateVolumeDiscount(volume, discountRate) {
  if (volume < 0 || discountRate < 0 || discountRate > 100) throw new Error('Invalid arguments for volume discount calculation');
  return (volume * (discountRate / 100));
}