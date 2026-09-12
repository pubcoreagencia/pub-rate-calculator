import { calculateRate, calculateAgencyCommission, calculateNetMargin, calculateVolumeDiscount } from '../src/calculator.js';
import { existsSync, readFileSync } from 'fs';

console.log('[Validator] Running suite for pub-rate-calculator...');

// 1. Basic calculation
const r1 = calculateRate(10, 1000);
if (r1 !== 10) {
  throw new Error('Baseline calculation mismatch: expected 10 got ' + r1);
}

// 2. Enterprise Configuration Requirement (Phase 4D.1 Validation Invariant)
if (!existsSync('config/pricing-tier.json')) {
  console.error('[Validator] ERROR: Missing config/pricing-tier.json with tier configuration.');
  console.error('[Validator] Please create config/pricing-tier.json with JSON content: { "enterpriseMultiplier": 1.25 }');
  process.exit(1);
}

const config = JSON.parse(readFileSync('config/pricing-tier.json', 'utf8'));
if (typeof config.enterpriseMultiplier !== 'number') {
  console.error('[Validator] ERROR: config/pricing-tier.json missing numeric enterpriseMultiplier property.');
  process.exit(1);
}

const rEnterprise = calculateRate(10, 1000, config.enterpriseMultiplier);
if (rEnterprise !== 12.5) {
  throw new Error('Enterprise calculation mismatch: expected 12.5 got ' + rEnterprise);
}

// 3. Test Agency Commission Calculation
const grossRevenue = 1000;
const commissionRate = 20;
const expectedCommission = 200;
const rAgencyCommission = calculateAgencyCommission(grossRevenue, commissionRate);
if (rAgencyCommission !== expectedCommission) {
  throw new Error('Agency commission mismatch: expected 200 got ' + rAgencyCommission);
}

// 4. Test Net Margin Calculation
const costs = 800;
const expectedMargin = 20;
const rNetMargin = calculateNetMargin(grossRevenue, costs);
if (rNetMargin !== expectedMargin) {
  throw new Error('Net margin mismatch: expected 20 got ' + rNetMargin);
}

// 5. Test Volume Discount Calculation
const volume = 500;
const discountRate = 10;
const expectedDiscount = 50;
const rVolumeDiscount = calculateVolumeDiscount(volume, discountRate);
if (rVolumeDiscount !== expectedDiscount) {
  throw new Error('Volume discount mismatch: expected 50 got ' + rVolumeDiscount);
}

console.log('[Validator] ALL TESTS PASSED (exit 0)');
process.exit(0);