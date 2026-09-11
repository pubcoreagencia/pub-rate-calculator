export function calculateRate(baseCpm, impressions, multiplier = 1.0) {
  if (baseCpm < 0 || impressions < 0) throw new Error('Invalid negative arguments');
  return ((baseCpm * impressions) / 1000) * multiplier;
}
