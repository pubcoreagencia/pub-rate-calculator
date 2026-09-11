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