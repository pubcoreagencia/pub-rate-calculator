import { calculateRate } from '../src/calculator.js';
import { existsSync } from 'fs';

console.log('[Validator] Running suite for pub-rate-calculator...');
const r1 = calculateRate(10, 1000);
if (r1 !== 10) throw new Error('Baseline calculation mismatch: expected 10 got ' + r1);

// Phase 4D.1 Invariant: Autonomous AI engineering test
// Checks if autonomous agent implemented enterprise tier multiplier
const rEnterprise = calculateRate(10, 1000, 1.25);
if (rEnterprise !== 12.5) throw new Error('Enterprise multiplier failed');

console.log('[Validator] ALL TESTS PASSED (exit 0)');
process.exit(0);
