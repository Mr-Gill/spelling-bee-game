# Spelling Bee Game - GitHub Copilot Instructions

**ALWAYS reference these instructions first and fallback to additional search and context gathering ONLY when information in these instructions is incomplete or found to be in error.**

## Project Overview

This is a comprehensive React/TypeScript web application that provides an interactive spelling bee game for educational use. The application features team-based and individual gameplay modes, rich educational content with phonics and etymology, AI-powered word list generation, and audio integration.

## Development Environment Setup

### Prerequisites
- **Node.js v20** (exact version used in CI)
- **npm** package manager

### Environment Setup
```bash
# Install Node.js v20 if not available
curl -fsSL https://nodejs.org/dist/v20.19.5/node-v20.19.5-linux-x64.tar.xz | tar -xJ
export PATH="$PWD/node-v20.19.5-linux-x64/bin:$PATH"

# Verify installation
node --version  # Should show v20.19.5 or similar
npm --version
```

## Quick Start - Essential Commands

### 1. Install Dependencies
```bash
npm install
```
**Timing:** Takes approximately 63 seconds. NEVER CANCEL - Set timeout to 120+ seconds.

### 2. Build Application  
```bash
# Complete build command (recommended)
npx esbuild src/spelling-bee-game.tsx --bundle --outfile=dist/app.js --jsx=automatic --target=es2020 --format=esm --loader:.mp3=file --loader:.svg=file --loader:.png=file --loader:.jpg=file --loader:.jpeg=file --define:process.env.NODE_ENV='"production"' --define:process.env.PUBLIC_URL='""' --define:process.env.GITHUB_TOKEN='""' --define:process.env.GITHUB_MODELS_TOKEN='""' --define:process.env.API_TOKEN='""' && npx tailwindcss -i ./src/tailwind.css -o dist/tailwind.css --minify && cp index.html style.css manifest.webmanifest service-worker.js leaderboard.json words.json dist/ && cp -r icons img wordlists dist/

# Alternative using custom build script (has CSS issues)
node build.js
```
**Timing:** Complete build takes approximately 2.4 seconds. NEVER CANCEL - Set timeout to 60+ seconds.

**Build Components:**
- JavaScript bundling (esbuild): ~117ms
- CSS compilation (Tailwind): ~1061ms  
- Asset copying: minimal time

### 3. Serve Application
```bash
npm start
# OR
npm run serve
```
**Access:** Application runs on `http://localhost:5000`
**Timing:** Server starts in ~5 seconds. NEVER CANCEL - Set timeout to 30+ seconds.

### 4. Test Suite
```bash
npm test
```
**Timing:** Tests run in ~2 seconds. **NOTE:** Some tests fail due to audio import issues in Jest environment - this is expected behavior.
**Working Tests:** History and word parsing functionality tests pass successfully.

## Application Validation Workflows

### CRITICAL: Manual Application Testing

**ALWAYS perform these validation steps after making changes:**

1. **Build and Serve:**
   ```bash
   npm install
   [build command from above]
   npm start
   ```

2. **Load Application:** Navigate to `http://localhost:5000`
   - ✅ Verify: Page loads with "🏆 SPELLING BEE CHAMPIONSHIP" header
   - ✅ Verify: Setup screen shows game mode selection (Team/Individual)
   - ✅ Verify: No JavaScript console errors (except font loading warnings)

3. **Test Game Flow:**
   - Click "Start Custom Game" button
   - ✅ Verify: Game screen loads with timer, teams, and word display
   - ✅ Verify: On-screen keyboard is functional
   - ✅ Verify: Help system shows points and options
   - ✅ Verify: Audio controls are present (may have functionality issues)

4. **Expected Issues (Document These):**
   - Font loading errors from Google Fonts (blocked by client) - NORMAL
   - Audio playback JavaScript errors - NORMAL, audio system needs API keys
   - Some mp3 files may 404 - NORMAL, depends on audio generation

## Project Structure

### Key Directories
- `src/` - Main application source code (React/TypeScript)
- `dist/` - Built application output
- `audio/` - Sound effects and music files
- `wordlists/` - Word list JSON files for gameplay
- `tests/` - Playwright test files
- `scripts/` - Build and generation scripts

### Important Files
- `src/spelling-bee-game.tsx` - Main application component
- `src/GameScreen.tsx` - Core game logic and UI
- `src/SetupScreen.tsx` - Game configuration interface
- `build.js` - Custom build script (alternative to react-scripts)
- `package.json` - Dependencies and scripts
- `playwright.config.ts` - Test configuration

### Configuration Files
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - CSS framework configuration  
- `.env.example` - Environment variables template

## Build System Details

### React Scripts vs Custom Build
- **react-scripts build** - Standard React build (may have import issues)
- **Custom build.js** - esbuild-based alternative (recommended for development)

### Required Source Structure Fixes
The repository has files in wrong locations. When working with the codebase:

1. **Copy Component Files to src/:**
   ```bash
   cp AchievementsScreen.tsx AudioContext.tsx GameScreen.tsx SetupScreen.tsx ShopScreen.tsx src/
   ```

2. **Copy Audio Directory:**
   ```bash
   cp -r audio src/
   ```

3. **Fix Import Paths:** Update imports in copied files to use relative paths within src/

### Environment Variables in Build
The build process requires these environment variable definitions:
- `process.env.NODE_ENV`
- `process.env.PUBLIC_URL` 
- `process.env.GITHUB_TOKEN`
- `process.env.GITHUB_MODELS_TOKEN`
- `process.env.API_TOKEN`

## Testing Infrastructure

### Playwright Tests
```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run specific test
npx playwright test tests/specific-test.spec.ts

# Generate test report
npm run test:report
```

**Timing:** Full test suite runs in ~2 seconds when working. NEVER CANCEL - Set timeout to 120+ seconds.

**Known Issues:**
- Audio file import errors in Jest environment are expected
- Some component tests fail due to build system mismatches
- Working tests: History functionality, word parsing, basic UI flows

### Manual Testing Checklist
After ANY code change, ALWAYS verify:
- [ ] Build completes without errors
- [ ] Application loads at localhost:5000
- [ ] Setup screen displays correctly
- [ ] Game can be started
- [ ] No blocking JavaScript errors

## Optional Features (Require External APIs)

### Audio Generation
```bash
# Requires ElevenLabs API key in .env
npm run generate:sfx
npm run generate:audio
npm run generate:all-audio
```
**Note:** Will fail without valid API keys - document as "requires external API setup"

### AI Word List Generation
```bash
# Requires GitHub Models API token
npm run generate:wordlist
npm run dev:wordlist
```
**Note:** Will fail without valid GitHub token - document as "requires GitHub Models API access"

## GitHub Workflows

### CI Pipeline (.github/workflows/ci.yml)
- Runs on macOS with Node.js 20
- Executes: `npm ci`, `npm run build`, `npm test`
- **Timing:** CI build takes 2-5 minutes. NEVER CANCEL in CI.

### Playwright Tests (.github/workflows/playwright.yml)  
- Runs on Ubuntu with Node.js 20
- **Timing:** Test suite takes 3-8 minutes. NEVER CANCEL in CI.

## Common Development Tasks

### Adding New Features
1. **ALWAYS build and test first** to establish baseline
2. Make minimal changes to source files in `src/`
3. **IMMEDIATELY rebuild and test** after changes
4. Use the manual validation workflow above
5. Commit only when application is fully functional

### Debugging Build Issues
1. Check for missing files in `src/` directory
2. Verify all imports use correct relative paths
3. Ensure environment variables are defined in build command
4. Test with both `npm start` and direct file access

### Performance Optimization
- Build output should be ~391KB for app.js
- CSS should be minified to <50KB
- Audio files are largest assets (~78KB for applause)

## Dependencies & Limitations

### Required Libraries
- React 18+ with TypeScript
- Tailwind CSS for styling
- esbuild for bundling
- Playwright for testing
- Lucide React for icons

### External Services (Optional)
- **ElevenLabs API** for audio generation (needs API key)
- **GitHub Models API** for AI word list generation (needs token)
- **Google Fonts** for typography (may be blocked in some environments)

### Browser Compatibility
- ✅ Chrome (recommended for development)
- ✅ Edge (recommended for classroom use)
- ✅ Firefox (good, minor audio delays)
- ✅ Safari (good on iOS/Mac)
- ⚠️ Mobile browsers (touch-friendly but limited audio)

## Troubleshooting Guide

### Build Failures
- **"Module not found"** - Copy component files to src/ directory
- **"process is not defined"** - Add environment variable definitions to build command
- **Audio import errors** - Normal in test environment, ignore for testing

### Runtime Issues  
- **Blank page** - Check browser console for JavaScript errors
- **Font loading errors** - Normal when Google Fonts blocked, doesn't affect functionality
- **Audio errors** - Expected without API keys, core game works without audio

### Test Failures
- **Audio import syntax errors** - Expected behavior, some tests will fail
- **Component mount errors** - Check that all files are in src/ directory
- **Network timeouts** - Increase timeout values, tests may take 30+ seconds

## Final Notes

- **BUILD TIME: ~2.4 seconds total**
- **INSTALL TIME: ~63 seconds**
- **TEST TIME: ~2 seconds (when working)**
- **STARTUP TIME: ~5 seconds**

**NEVER CANCEL long-running operations.** The application build is fast, but initial npm install and CI processes can take several minutes and should be allowed to complete.

**ALWAYS validate application functionality manually** by loading the game and testing core workflows. Automated tests have known limitations due to audio system complexity.