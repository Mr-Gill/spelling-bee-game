# 🏆 Interactive Spelling Bee Championship

> **A comprehensive, classroom-ready spelling bee game designed for K-12 educators with rich phonics content, team competition, and seamless lesson plan integration.**

[![Live Demo](https://img.shields.io/badge/🎮_Play_Now-Live_Demo-brightgreen?style=for-the-badge)](https://squidgyg.github.io/spelling-bee-game/)
[![Education](https://img.shields.io/badge/📚_Built_for-Education-blue?style=for-the-badge)](https://squidgyg.github.io/spelling-bee-game/)
[![Open Source](https://img.shields.io/badge/📖_License-MIT-orange?style=for-the-badge)](LICENSE)

---

## 🤖 **AI-Powered Word Lists**

Generate custom spelling word lists tailored to your classroom needs using GitHub's AI models. The system can create word lists on any topic with rich educational content including definitions, origins, and pronunciation guides.

### Key Features:
- **Custom Topics** - Generate words on any subject or theme
- **Curriculum-Aligned** - Words are selected based on grade-level appropriateness
- **Rich Content** - Each word includes definition, origin, example, and pronunciation
- **Automatic Updates** - Word lists are generated and deployed automatically

[Learn more about word list generation](WORDLIST.md)

---

## 🎯 **Perfect for Educators**

Transform your spelling lessons into engaging, interactive competitions that students love! This isn't just a game—it's a comprehensive educational tool designed by teachers, for teachers.

### ✨ **Why Teachers Choose This Tool**
- 📋 **Lesson Plan Ready** - Matches educational standards and curriculum goals
- 🧠 **Rich Learning Content** - Etymology, phonics, and morphology for every word
- 👥 **Flexible Classroom Use** - Individual students or team competitions
- 📊 **Built-in Assessment** - Real-time progress tracking and accuracy metrics
- 🎨 **Projection Optimized** - High contrast design perfect for classroom displays
- 🔊 **Audio Support** - Text-to-speech for pronunciation and accessibility

---

## 🎮 **Game Modes & Features**

### 🧑‍🎓 **Individual Student Mode** *(Perfect for Lesson Plans)*
- **5 lives per student** - Matches traditional spelling bee format
- **Individual assessment** - Track each student's progress
- **Pressure practice** - Timed spelling under classroom conditions
- **Elimination format** - Builds resilience and focus

### 👥 **Team Competition Mode** *(Great for Collaborative Learning)*
- **10 lives per team** - Encourages teamwork and support
- **Second chances** - If one team fails, the other team gets to try
- **Strategic help system** - Teams must decide when to use assistance
- **Social learning** - Students learn from each other's attempts

### ⏰ **Advanced Gameplay Features**
- **30-Second Timer** with visual countdown and warning alerts
- **Auto-Progression** - Easy → Medium → Hard → Review incorrect words
- **Help Shop System** - Strategic point-based assistance options
- **Incorrect Word Tracking** - Identify challenging words for future lessons
- **Sound Effects** - Audio feedback for correct/incorrect answers
- **Pronunciation Display** - Phonetic guides shown alongside the word
- **Dynamic Scoring** - Players start with 1 point and earn more with difficulty multipliers and streak bonuses

---

## 📚 **Educational Content (Every Word Includes)**

### 🔍 **Comprehensive Word Analysis**
- **📖 Definition** - Clear, age-appropriate explanations
- **🗣️ Pronunciation** - Audio playback and phonetic guides
- **📊 Syllables** - Complete syllable breakdowns (e.g., ["but", "ter", "fly"])
- **🌍 Etymology** - Word origins and historical development
- **🧩 Morphology** - Prefix, suffix, and root word analysis
- **📝 Example Sentences** - Contextual usage with audio playback

### 🎓 **Curriculum Alignment**
- **Common Core Standards** - Language arts and vocabulary development
- **Phonics Instruction** - Word structure and sound-spelling relationships
- **Vocabulary Building** - Contextual learning with rich definitions
- **Morphological Awareness** - Understanding word parts and formation
- **Assessment Integration** - Real-time data for progress monitoring

---

## 🛍️ **Strategic Help Shop System**

Students earn points for correct answers and can strategically spend them on assistance. Players start with 1 point each, allowing immediate use of the shop:

| Help Item | Cost | Description |
|-----------|------|-------------|
| 🔍 **Reveal Word** | 3 points | Show the word in large text |
| ⏱️ **Extra Time** | 2 points | Add 15 seconds to the timer |
| 📖 **Definition Hint** | 1 point | Provide the word's definition |
| 🌍 **Origin Hint** | 1 point | Share the word's origin |
| 📝 **Sentence Hint** | 1 point | Use the word in a sentence |

*This system encourages strategic thinking and resource management while providing scaffolded support.*

---

## 🚀 **Quick Start for Teachers**

### 🔑 **GitHub Token Setup (Required for AI Features)**

To enable AI-powered word list generation, you'll need to set up a GitHub token with the `models: read` permission:

1. **Generate a GitHub Token**:
   - Go to [GitHub Settings > Developer settings > Personal access tokens > Fine-grained tokens](https://github.com/settings/tokens)
   - Click "Generate new token"
   - Name it "Spelling Bee AI"
   - Set expiration (or select "No expiration" for permanent tokens)
   - Select your repository
   - Under "Repository permissions", find "Models" and select "Read-only"
   - Click "Generate token" and copy the token

2. **Add Token to GitHub Repository Secrets**:
   - Go to your repository Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `GITHUB_MODELS_TOKEN`
   - Value: Paste your token
   - Click "Add secret"

### 🌐 **Option 1: Use Online (Recommended)**
1. **Visit**: [https://squidgyg.github.io/spelling-bee-game/](https://squidgyg.github.io/spelling-bee-game/)
2. **Project** on your classroom screen or smart board
3. **Choose** Individual Students mode (5 lives each)
4. **Add** your students by name
5. **Select** a word list (August 27th lesson included!)
6. **Start** your engaging spelling bee!

### 💻 **Option 2: Download for Offline Use**
```bash
# Download files
git clone https://github.com/SquidgyG/spelling-bee-game.git
cd spelling-bee-game

# Install dependencies and build
npm install
npm run build

# Open in browser
open dist/index.html
```

---

## 📝 **Word List Management**

### 🎯 **Pre-loaded Educational Lists**
- **August 27th Lesson** - Complete curriculum-aligned word set
- **Default Collection** - Multi-level difficulty progression

### ➕ **Easy Custom Word Lists**
1. Click **"+ Add Word List"** during setup
2. Use the provided JSON template or the in-app **Download Template** button ([direct link](wordlists/example.csv))
3. Each word requires:
   ```json
   {
     "word": "example",
     "syllables": ["ex", "am", "ple"],
     "definition": "A thing characteristic of its kind",
     "origin": "Latin 'exemplum' meaning sample",
     "example": "This is a good example of the format.",
     "prefix": "",
     "suffix": "",
     "pronunciation": "ig-ZAM-pul"
   }
   ```

### 🤖 **AI‑Generated Word Lists**

Teachers can automatically create new lists using GitHub-hosted models.

**Prerequisite**: a GitHub account with access to [GitHub Models](https://docs.github.com/en/github-models/overview) and a personal access token.

```bash
export GITHUB_TOKEN=ghp_yourtoken
# For OpenAI-compatible clients
export OPENAI_API_KEY=$GITHUB_TOKEN
export OPENAI_API_BASE=https://models.inference.ai.azure.com
```

**Example prompt**

> "Create 3 easy spelling bee words for 2nd graders. Return a JSON array of objects with word, syllables, definition, origin, example, prefix, suffix, pronunciation."

**Example usage**

```bash
curl -sL https://models.inference.ai.azure.com/v1/chat/completions \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "model": "gpt-4o-mini",
        "messages": [
          {"role": "system", "content": "You generate spelling bee word lists in JSON."},
          {"role": "user", "content": "Create 3 easy words for 2nd graders with definition, syllables and example."}
        ]
      }'
```

**Sample output**

```json
{
  "choices": [
    {
      "message": {
        "content": "[\n  {\n    \"word\": \"pencil\",\n    \"syllables\": [\"pen\", \"cil\"],\n    \"definition\": \"a tool for writing\",\n    \"origin\": \"Latin\",\n    \"example\": \"I sharpened my pencil.\",\n    \"prefix\": \"\",\n    \"suffix\": \"\",\n    \"pronunciation\": \"PEN-sil\"\n  },\n  {\n    \"word\": \"music\",\n    \"syllables\": [\"mu\", \"sic\"],\n    \"definition\": \"sounds that are sung or played\",\n    \"origin\": \"Greek\",\n    \"example\": \"She loves music.\",\n    \"prefix\": \"\",\n    \"suffix\": \"\",\n    \"pronunciation\": \"MYOO-zik\"\n  },\n  {\n    \"word\": \"garden\",\n    \"syllables\": [\"gar\", \"den\"],\n    \"definition\": \"a place to grow plants\",\n    \"origin\": \"Old English\",\n    \"example\": \"The garden has roses.\",\n    \"prefix\": \"\",\n    \"suffix\": \"\",\n    \"pronunciation\": \"GAR-den\"\n  }\n]"
      }
    }
  ],
  "usage": { "prompt_tokens": 63, "completion_tokens": 122, "total_tokens": 185 }
}
```

Copy the array from `choices[0].message.content` into a file in `wordlists/`. The `usage` block shows token counts to help estimate costs.

### 📊 **Word List Features**
- **Multiple Difficulties** - Easy, Medium, Hard auto-progression
- **Educational Metadata** - Rich phonics and etymology content
- **Flexible Import** - JSON format for easy sharing between teachers
- **Curriculum Alignment** - Matches grade-level expectations

---

## 🎯 **Classroom Integration Guide**

### 📋 **Lesson Plan Integration**
```
🕐 Warm-up (5 min): Review yesterday's challenging words
🕑 Main Activity (20 min): Spelling bee competition
🕒 Wrap-up (5 min): Analyze word patterns and origins
🕓 Assessment: Built-in scoring and progress tracking
```

### 🎨 **Projection Best Practices**
- **High Contrast Mode** - Optimized for classroom projectors
- **Large Text Display** - Readable from the back of the classroom
- **Audio Controls** - Easy teacher controls for pronunciation
- **Timer Management** - Pause/resume for classroom management

### 📊 **Assessment & Data**
- **Individual Progress** - Track each student's accuracy and improvement
- **Class Analytics** - Identify challenging words and patterns
- **Differentiation** - Multiple difficulty levels and support systems
- **Documentation** - Screenshot results for portfolios and records

---

## 🔊 **Audio Generation**

This project includes scripts to generate high-quality audio files using ElevenLabs' text-to-speech API. The audio includes word pronunciations, UI feedback sounds, and sound effects.

### Prerequisites
1. **Get an API Key**
   - Sign up at [ElevenLabs](https://elevenlabs.io/)
   - Create an API key in your account settings

2. **Set Up Environment**
   - Copy `.env.example` to `.env`
   - Add your ElevenLabs API key to the `.env` file

### Generating Audio Files

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Generate Sound Effects**
   ```bash
   npm run generate:sfx
   ```
   This will create UI and feedback sounds in `public/audio/sfx/`

3. **Generate Word Pronunciations**
   ```bash
   npm run generate:audio
   ```
   This will generate audio files for all words in the word list

4. **Generate Everything**
   ```bash
   npm run generate:all-audio
   ```
   This will generate both sound effects and word pronunciations

### Audio File Structure
- `public/audio/words/` - Word pronunciation files (e.g., `apple.mp3`)
- `public/audio/sfx/` - Sound effects (e.g., `correct.mp3`, `wrong.mp3`)
- `public/audio/ui/` - UI interaction sounds (e.g., `click.mp3`)

### Customizing Audio
- Edit `scripts/generate-audio.ts` to modify word pronunciations
- Edit `scripts/generate-sfx.ts` to modify sound effects
- Update voice settings in `.env`

## 🚀 **Build & Deployment**

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the project (outputs files to `dist/`):
   ```bash
   npm run build
   ```
   This generates `dist/app.js`, `dist/tailwind.css`, and copies required assets.
3. Deploy or serve the contents of the `dist/` directory.

> Built files are no longer committed to the repository and are produced during the build step.

## 🔧 **Customization Options**

### ⚙️ **Easy Modifications** (Edit `spelling-bee-game.tsx` then run `npm run build` to generate `dist/app.js`)
```javascript
// Change timer duration
setTimeLeft(30) // 30 seconds (default)

// Adjust lives per game mode  
lives = gameMode === 'individual' ? 5 : 10

// Modify help shop costs
useHelpItem('reveal', 3) // 3 points to reveal word

// Update team colors
getTeamColor = ['bg-red-500', 'bg-blue-500', 'bg-green-500']
```

### 🎨 **Visual Customization**
- **School Colors** - Match your institution's branding
- **Custom Themes** - Seasonal or subject-specific designs
- **Audio Packs** - Different sound effects for variety
- **Team Names** - Pre-set school team names or houses

---

## 🔄 **Future Enhancements Roadmap**

### 🛍️ **Enhanced Help Shop System**
- **Hangman-Style Reveals** - Show word with missing letters (4-5 points)
- **Friend Substitution** - Let a teammate help spell (4-5 points)  
- **Vowel Reveal** - Show all vowels in the word (3 points)
- **Definition Hints** - Get synonyms or category clues (2 points)
- **Etymology Breakdown** - Detailed word origin explanation (2 points)
- **Multiple Attempts** - Buy a second chance at the same word (3 points)
- **Skip Word** - Move to easier word from same difficulty (2 points)
- **Word Length Hint** - Display number of letters (1 point)
- **Rhyme Clue** - Get a word that rhymes (2 points)
- **Category Hint** - "This is a type of..." (1 point)

### 🎯 **Dynamic Scoring & Points System**  
- **Player Count Scaling** - Starting points = number of players (promotes strategy)
- **Difficulty Multipliers** - Easy (1x), Medium (2x), Hard (3x) point rewards
- **Streak Bonuses** - Bonus points for consecutive correct answers
- **Speed Bonuses** - Extra points for answering quickly (under 10 seconds)
- **Comeback Mechanics** - Bonus points when behind to keep games competitive
- **Team Size Balancing** - Larger teams get fewer starting points
- **Achievement System** - Unlock badges for milestones (10 correct, perfect round, etc.)

### 📚 **Advanced Word Management**
- **Word Difficulty Auto-Detection** - AI analysis of word complexity
- **Curriculum Alignment** - Grade-level appropriate word filtering
- **Word Usage Analytics** - Track which words are most challenging
- **Seasonal Word Lists** - Holiday, seasonal, or themed collections
- **Student-Submitted Words** - Let students contribute words they want to learn
- **Word of the Day Integration** - Import from educational APIs
- **Phonics Pattern Grouping** - Words by spelling patterns (silent E, double letters, etc.)
- **Import from CSV/Excel** - Bulk word list uploads
- **Word Audio Recording** - Custom pronunciation recordings by teachers

### 🎮 **Enhanced Gameplay Features**
- **Sudden Death Mode** - One mistake elimination after certain round
- **Lightning Round** - 10-second timer for final challenge
- **Bonus Rounds** - Special categories (compound words, homophones)
- **Multiplayer Tournaments** - Bracket-style competitions across classes
- **Session Challenges** - New word challenges each session
- **Progressive Difficulty** - Words get harder as game continues
- **Word Duels** - Head-to-head spelling battles
- **Mystery Word Mode** - Clues only, no definition given initially
- **Themed Sessions** - Science terms, literature vocab, historical figures

### 👩‍🏫 **Teacher Administration Features**
- **Class Management** - Save student/team rosters
- **Performance Tracking** - Individual student progress over time  
- **Lesson Plan Integration** - Align word lists with curriculum standards
- **Parent Reports** - Send home progress summaries
- **Custom Timer Settings** - Adjust time limits per difficulty
- **Accessibility Options** - Larger text, high contrast, audio cues
- **Homework Mode** - Students practice independently with reporting
- **Assessment Tools** - Generate spelling tests from practiced words
- **Behavior Integration** - Reward points for classroom behavior

### 📊 **Analytics & Reporting**
- **Learning Analytics Dashboard** - Visual progress tracking
- **Mistake Pattern Analysis** - Identify common error types
- **Engagement Metrics** - Time spent, games played, participation rates
- **Word Mastery Tracking** - Which words students have learned
- **Class Comparison Reports** - Benchmark against grade level
- **Individual Learning Plans** - Personalized word recommendations
- **Progress Photos** - Visual documentation for portfolios
- **Export to Google Classroom** - Seamless grade integration
- **Print Certificates** - Achievement awards for students

### 🌐 **Integration & Connectivity**  
- **Google Classroom Integration** - Import class rosters, push assignments
- **Canvas/Schoology Support** - LMS gradebook integration
- **Zoom/Teams Integration** - Virtual classroom compatibility
- **Interactive Whiteboard Support** - Smart board touch controls
- **Mobile App Version** - Native iOS/Android apps
- **Voice Recognition** - AI spell-checking for pronunciation practice
- **Translation Support** - Multi-language word lists for ESL
- **API for Developers** - Let schools build custom integrations

### 🎨 **Customization & Personalization**
- **Theme Customization** - School colors, mascots, branding
- **Avatar System** - Student profile pictures and characters
- **Custom Sound Packs** - Different audio themes (space, nature, etc.)
- **Seasonal Themes** - Halloween, Christmas, Spring decorations
- **Classroom Decorations** - Virtual classroom backgrounds
- **Student Name Pronunciation** - Audio recordings of student names
- **Cultural Celebrations** - Word lists for different cultural events
- **Regional Spelling Variants** - British vs American spelling options

### 🔧 **Technical Improvements**  
- **Offline Mode** - Work without internet connection
- **Auto-Save Progress** - Never lose game state
- **Cross-Device Sync** - Continue games on different devices
- **Performance Optimization** - Faster loading, smoother animations
- **Better Mobile Responsive** - Improved tablet/phone experience
- **Keyboard Shortcuts** - Quick teacher controls (spacebar for correct, etc.)
- **Undo Function** - Reverse accidental scoring mistakes
- **Export Game Data** - Download results as spreadsheets
- **Cloud Backup** - Automatic word list and progress backup

### 🏆 **Gamification Enhancements**
- **Experience Points (XP)** - Level up system for long-term engagement
- **Leaderboards** - School-wide, class, or district competitions
- **Collectible Cards** - Unlock word cards showing etymology, usage
- **Virtual Rewards** - Unlock themes, avatars, sound effects
- **Guild System** - Students form spelling teams across classes
- **Session Participation Rewards** - Bonus points for consistent participation across sessions
- **Seasonal Events** - Special competitions during school events
- **Spelling Bee Preparation Mode** - Training for real competitions

### 📱 **Parent/Home Connection**
- **Parent Dashboard** - View child's spelling progress at home
- **Home Practice Mode** - Continue learning outside classroom
- **Family Challenges** - Parents vs students spelling games  
- **Progress Sharing** - Email/text updates to parents
- **Homework Assignments** - Teachers assign specific word practice
- **Summer Learning Mode** - Prevent summer learning loss
- **Study Reminders** - Notification system for practice

### 🌟 **Accessibility & Inclusion**
- **Screen Reader Support** - Full accessibility for visually impaired
- **Colorblind-Friendly Design** - High contrast color schemes
- **Large Text Options** - Adjustable font sizes
- **Dyslexia-Friendly Fonts** - OpenDyslexic font option
- **Motor Accessibility** - Switch/joystick control support
- **Hearing Impaired Support** - Visual cues for all audio
- **Multi-Language Support** - Spanish, French, Mandarin interfaces
- **Cognitive Load Options** - Simplified UI for learning differences

### 🚀 **Implementation Priority**

**Phase 1 (Quick Wins):**
- Dynamic point allocation based on player count
- More help shop items (hangman, vowel reveal)
- Custom timer settings
- Word streak bonuses

**Phase 2 (Enhanced Learning):**
- Progress tracking and analytics
- Word difficulty auto-detection  
- Parent reporting system
- Mobile responsiveness improvements

**Phase 3 (Advanced Features):**
- Google Classroom integration
- Voice recognition spelling
- Offline mode
- Tournament bracket system

**Phase 4 (Enterprise Features):**
- Multi-school leaderboards
- Advanced analytics dashboard
- API for third-party integrations
- Professional development resources

---

## 🎯 **Quick Customizations You Can Make Now**

### 💡 **Easy 5-Minute Changes**
```javascript
// 1. Change starting points to match player count
teamPoints[index] = teams.length; // Instead of 1

// 2. Add timer options
const timerOptions = [15, 30, 45, 60]; // seconds

// 3. Modify team colors for school branding
const schoolColors = ['bg-red-500', 'bg-gold-500', 'bg-blue-500'];

// 4. Adjust help shop prices
const helpPrices = { reveal: 2, time: 1, hint: 1 };
```

### 🎨 **Visual Customizations**
- Replace team colors with school colors in `getTeamColor()`
- Add school logo to header section
- Modify timer warnings and success messages
- Create themed word lists for special events

---

## 🌍 **Browser Compatibility**

| Browser | Status | Audio Support | Notes |
|---------|---------|---------------|--------|
| ✅ **Chrome** | Excellent | Full | Recommended |
| ✅ **Edge** | Excellent | Full | Recommended |  
| ✅ **Firefox** | Good | Good | Minor audio delays |
| ✅ **Safari** | Good | Good | iOS/Mac compatible |
| 📱 **Mobile** | Good | Limited | Touch-friendly interface |

**💡 Tip**: Chrome and Edge provide the best audio experience for classroom use.

---

## 🤝 **Contributing & Community**

### 🎓 **For Educators**
- **Share Word Lists** - Create and share curriculum-aligned word sets
- **Report Issues** - Help improve the classroom experience
- **Feature Requests** - Suggest educational enhancements
- **Success Stories** - Share how you use it in your classroom

### 👨‍💻 **For Developers**  
- **Fork the Repository** - Make your own educational improvements
- **Submit Pull Requests** - Add features that benefit teachers
- **Create Extensions** - Build plugins for specific curricula
- **Accessibility** - Help make education accessible to all students

### 📧 **Get Support**
- **📝 Report Issues**: [GitHub Issues](https://github.com/SquidgyG/spelling-bee-game/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/SquidgyG/spelling-bee-game/discussions)
- **📖 Documentation**: Check this README and code comments
- **🌟 Feature Requests**: Open an issue with the "enhancement" label

---

## 📄 **License & Usage**

This project is **open source** and available under the [MIT License](LICENSE). 

**🎓 Educational Use Encouraged:**
- ✅ Free for all educational institutions
- ✅ Modify for your curriculum needs  
- ✅ Share with other educators
- ✅ Use in lesson plans and assessments
- ✅ Include in educational resources

---

## 🏆 **Perfect for Every Classroom**

Whether you're teaching phonics to elementary students, vocabulary to middle schoolers, or preparing high schoolers for competitions, this spelling bee game adapts to your needs while maintaining the rich educational content that makes learning meaningful.

**🎯 Ready to transform your spelling lessons? [Start playing now!](https://squidgyg.github.io/spelling-bee-game/)**

---

## Development

### AI Word List Endpoint

Run a local server that uses GitHub Models to generate word lists:

```
npm run dev:wordlist
```

The server expects a `GITHUB_TOKEN` with the `models:read` scope.

---

## New Features

### Audio System
- Consolidated audio management with volume controls
- Added mute toggle button in-game

### UI Enhancements
- Avatar selection system
- Theme customization
- Confetti animations on achievements

### Game Modes
- Daily Challenge mode
- Teacher Mode toggle

### Achievements System
- First Victory
- Perfect Game
- Speed Demon
- Word Master
- Daily Streak

---

<div align="center">

**Built with ❤️ for educators by educators**

[![⭐ Star this repo](https://img.shields.io/github/stars/SquidgyG/spelling-bee-game?style=social)](https://github.com/SquidgyG/spelling-bee-game/stargazers)
[![🍴 Fork this repo](https://img.shields.io/github/forks/SquidgyG/spelling-bee-game?style=social)](https://github.com/SquidgyG/spelling-bee-game/fork)
[![📖 Follow updates](https://img.shields.io/github/watchers/SquidgyG/spelling-bee-game?style=social)](https://github.com/SquidgyG/spelling-bee-game/watchers)

*Transform spelling lessons into engaging adventures that students remember forever!*

</div>
# Spelling Bee Game - Update Sat Aug 30 04:40:38 AEST 2025
