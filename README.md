# 🏆 Interactive Spelling Bee Championship

> **A classroom-ready spelling bee game for K-12 educators — team or individual play, rich phonics content, a strategic help shop, and AI-powered word list generation.**

[![Live Demo](https://img.shields.io/badge/🎮_Play_Now-Live_Demo-brightgreen?style=for-the-badge)](https://mr-gill.github.io/spelling-bee-game/)
[![Education](https://img.shields.io/badge/📚_Built_for-Education-blue?style=for-the-badge)](https://mr-gill.github.io/spelling-bee-game/)
[![Open Source](https://img.shields.io/badge/📖_License-MIT-orange?style=for-the-badge)](LICENSE)

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

## 🎯 **Perfect for Educators**

Transform your spelling lessons into engaging, interactive competitions that students love. This isn't just a game — it's a comprehensive educational tool designed by teachers, for teachers.

### ✨ **Why Teachers Choose This Tool**
- 📋 **Lesson Plan Ready** - Matches educational standards and curriculum goals
- 🧠 **Rich Learning Content** - Etymology, phonics, and morphology for every word
- 👥 **Flexible Classroom Use** - Individual students or team competitions
- 📊 **Built-in Assessment** - Real-time progress tracking and accuracy metrics
- 🎨 **Projection Optimized** - High contrast design perfect for classroom displays
- 🔊 **Audio Support** - Text-to-speech for pronunciation and accessibility
- 🤖 **AI Word Lists** - Generate custom word lists on any topic using GitHub Models

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
1. **Visit**: [https://mr-gill.github.io/spelling-bee-game/](https://mr-gill.github.io/spelling-bee-game/)
2. **Project** on your classroom screen or smart board
3. **Choose** Individual Students mode (5 lives each)
4. **Add** your students by name
5. **Select** a word list (August 27th lesson included!)
6. **Start** your engaging spelling bee!

### 💻 **Option 2: Run Locally**
```bash
# Download files
git clone https://github.com/Mr-Gill/spelling-bee-game.git
cd spelling-bee-game

# Install dependencies and build
npm install
npm run build

# Serve locally
npm start
# Then open http://localhost:5173 in your browser
```

---

## 📝 **Word List Management**

### 🎯 **Pre-loaded Educational Lists**
- **August 27th Lesson** - Complete curriculum-aligned word set
- **Default Collection** - Multi-level difficulty progression

### ➕ **Easy Custom Word Lists**
1. Click **"+ Add Word List"** during setup
2. Use the in-app template downloads for CSV, TSV, TXT, or JSON ([CSV direct link](wordlists/template.csv))
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
- `assets/audio/` - Music tracks and sound effects served at runtime
- `assets/audio/spelling-bee-{style}.mp3` - Background music (funk, rock, country, etc.)
- `assets/audio/correct.mp3`, `wrong.mp3`, etc. - Feedback sound effects

### Customizing Audio
- Edit `scripts/generate-audio.ts` to modify word pronunciations
- Edit `scripts/generate-sfx.ts` to modify sound effects
- Update voice settings in `.env`

---

## 🛠️ **Development Setup**

### Setup

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with the following content:
   ```
   GITHUB_TOKEN=your_token_here
   # optional: override the word list generation endpoint
   VITE_WORDLIST_URL=http://localhost:3001/generate-word-list
   ```
4. Run `npm start` to serve the built app at `http://localhost:5173`

### Building for Production

Run `npm run build` to create a production build in the `dist` directory.

### AI Word List Endpoint

Run a local server that uses GitHub Models to generate word lists:

```bash
npm run dev:wordlist
```

The server expects a `GITHUB_TOKEN` with the `models:read` scope. See `.env.example` for all supported environment variables.

---

## 🗺️ **Roadmap**

See the [open issues](https://github.com/Mr-Gill/spelling-bee-game/issues) for a full list of proposed features and known bugs. Planned enhancements include:

- Expanded help shop items (hangman-style reveals, vowel hints)
- Google Classroom and LMS integration
- Offline mode and cross-device sync
- Voice recognition for pronunciation practice
- Advanced analytics and parent reporting
- Accessibility improvements (screen reader, dyslexia-friendly fonts)

Contributions are welcome! Open an issue with the "enhancement" label to suggest a feature.

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
- **📝 Report Issues**: [GitHub Issues](https://github.com/Mr-Gill/spelling-bee-game/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/Mr-Gill/spelling-bee-game/discussions)
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

**🎯 Ready to transform your spelling lessons? [Start playing now!](https://mr-gill.github.io/spelling-bee-game/)**

---

## Development

### AI Word List Endpoint

Run a local server that uses GitHub Models to generate word lists:

```
GITHUB_MODELS_TOKEN=your_token_here npm run ai:server
```

The server expects `GITHUB_MODELS_TOKEN` or `GITHUB_TOKEN` with the `models: read` permission. By default it calls `https://models.github.ai/inference/chat/completions` with `openai/gpt-4.1`.

Optional settings:

```
GITHUB_MODELS_MODEL=openai/gpt-4.1
GITHUB_MODELS_ORG=your-org-login
AI_SHARED_PASSWORD=choose-a-shared-password
PORT=3001
```

Then use **Generate with AI** in the setup screen. With token field left blank, the frontend posts to `VITE_WORDLIST_URL` (default `http://localhost:3001/wordlist`) and sends the optional **AI Proxy Password** header.

On GitHub Pages, there is no server that can safely hold a secret. Recommended setup:
1. Host a small AI proxy with `GITHUB_MODELS_TOKEN` in server env.
2. Set `AI_SHARED_PASSWORD` on that proxy.
3. Build/deploy with `VITE_WORDLIST_URL=https://your-proxy.example.com/wordlist`.
4. In the app, leave token blank and enter **AI Proxy Password** once per browser session.

Fallback setup: paste a fine-grained GitHub token with `models: read` into the **GitHub Models Token** field in setup. This stores token in browser `sessionStorage` only.

### GitHub Pages AI Checklist

If **Generate with AI** fails on the live site, check these in order:

1. Prefer proxy mode: configure proxy env `GITHUB_MODELS_TOKEN` (+ optional `AI_SHARED_PASSWORD`) and set `VITE_WORDLIST_URL` in your build.
2. In GitHub repository settings, open **Models** and enable Models for this repository.
3. In setup, leave token blank and enter proxy password (if required).
4. Try a small generation first (for example, 10 words) to confirm auth.

Common errors:

- `401 Unauthorized`: token invalid/missing `models: read`, or proxy password rejected.
- `403 Forbidden`: Models is not enabled for the repo, or org policy blocks the selected model.
- `429`: rate limit reached; wait and retry.

<div align="center">

**Built with ❤️ for educators by educators**

[![⭐ Star this repo](https://img.shields.io/github/stars/Mr-Gill/spelling-bee-game?style=social)](https://github.com/Mr-Gill/spelling-bee-game/stargazers)
[![🍴 Fork this repo](https://img.shields.io/github/forks/Mr-Gill/spelling-bee-game?style=social)](https://github.com/Mr-Gill/spelling-bee-game/fork)
[![📖 Follow updates](https://img.shields.io/github/watchers/Mr-Gill/spelling-bee-game?style=social)](https://github.com/Mr-Gill/spelling-bee-game/watchers)

*Transform spelling lessons into engaging adventures that students remember forever!*

</div>
