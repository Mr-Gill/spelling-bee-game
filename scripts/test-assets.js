#!/usr/bin/env node

/**
 * Asset verification script
 * Checks that all referenced assets exist and follows naming conventions
 */

const fs = require('fs');
const path = require('path');

// Expected asset structure
const expectedAssets = [
  // Audio files
  'assets/audio/spelling-bee-funk.mp3',
  'assets/audio/spelling-bee-funk-instrumental.mp3',
  'assets/audio/spelling-bee-rock.mp3',
  'assets/audio/spelling-bee-rock-instrumental.mp3',
  'assets/audio/spelling-bee-country.mp3',
  'assets/audio/spelling-bee-country-instrumental.mp3',
  'assets/audio/applause.mp3',
  'assets/audio/buzzer.mp3',
  'assets/audio/correct.mp3',
  'assets/audio/wrong.mp3',
  
  // Image files
  'assets/img/default-bee.png',
  'assets/img/help-bee.png',
  'assets/img/typing-bee.png',
  'assets/img/celebratory-bee.png',
  'assets/img/winning-bee.png',
  
  // Avatar files
  'assets/img/avatars/bee.svg',
  'assets/img/avatars/book.svg',
  'assets/img/avatars/trophy.svg',
];

console.log('🔍 Asset Verification Test\n');

let passed = 0;
let failed = 0;

// Check if files exist
expectedAssets.forEach(assetPath => {
  if (fs.existsSync(assetPath)) {
    console.log(`✅ ${assetPath}`);
    passed++;
  } else {
    console.log(`❌ ${assetPath} - NOT FOUND`);
    failed++;
  }
});

// Check naming convention (no spaces, apostrophes, etc.)
const badChars = /['\s()!]/;
expectedAssets.forEach(assetPath => {
  if (badChars.test(assetPath)) {
    console.log(`❌ ${assetPath} - Contains problematic characters`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All asset tests passed! Asset management system is working correctly.');
  process.exit(0);
} else {
  console.log('💥 Some asset tests failed. Please check the issues above.');
  process.exit(1);
}