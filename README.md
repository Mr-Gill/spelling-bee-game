# 🏆 Interactive Spelling Bee Championship

A comprehensive, classroom-ready spelling bee game designed for educational use with rich phonics content, team competition, and advanced features.

## ✨ Features

### 🎯 Game Modes
- **Individual Students** (5 lives each) - Perfect for lesson plans
- **Team Competition** (10 lives per team) - Great for collaborative learning

### 🎮 Core Gameplay
- **30-Second Timer** with visual countdown
- **Team Alternation** - Second team gets a chance if first team fails
- **Auto Progression** - Easy → Medium → Hard → Review incorrect words
- **Lives System** with elimination mechanics
- **Point Economy** with help shop rewards

### 📚 Educational Content
For each word:
- **Definition** - Clear, age-appropriate explanations
- **Etymology** - Word origins and historical background  
- **Syllable Breakdown** - Pronunciation guides
- **Example Sentences** - Contextual usage with audio
- **Word Structure Analysis** - Prefixes, suffixes, roots
- **Audio Pronunciation** - Built-in text-to-speech

### 🛍️ Help Shop System
Teams earn points for correct answers and can spend them on:
- **Reveal Word** (3 points) - Show the word in large text
- **Extra Time** (2 points) - Add 15 seconds to timer
- **Syllable Count** (1 point) - Audio hint about syllables

### 🔊 Audio & Visual Features
- **Success/Error Sound Effects** - Audio feedback for answers
- **Timer Warnings** - Visual alerts when time is running low
- **Word Center Display** - Large word reveal for dramatic effect
- **Incorrect Words Tracking** - Review frequently missed words

### 📝 Word List Management
- **Pre-loaded Word Lists** - August 27th lesson words included
- **Custom Word Lists** - Easy JSON import system
- **Multiple Difficulties** - Easy, Medium, Hard progression
- **Sample Format Helper** - Copy-paste template for new lists

## 🚀 Quick Setup

### GitHub Pages Deployment
1. **Fork or create** a new repository on GitHub
2. **Upload these files**:
   - `index.html`
   - `style.css` 
   - `app.js`
   - `README.md`
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Set source to "Deploy from a branch"
   - Select main branch and / (root) folder
   - Save changes

Your game will be live at: `(https://squidgyg.github.io/spelling-bee-game/)`

### Local Development
1. Download all files to a folder
2. Open `index.html` in a web browser
3. No build process or server required!

## 🎓 Perfect for Education

### Lesson Plan Alignment
This game supports:
- **Phonics-based Learning** - Etymology and word structure analysis
- **Syllable Recognition** - Clear breakdowns and pronunciation guides  
- **Morpheme Knowledge** - Prefix, suffix, and root identification
- **Vocabulary Building** - Definitions and contextual usage
- **Pressure Practice** - Timed spelling under classroom conditions

### Classroom Ready
- **Projection Optimized** - High contrast, large text for classroom display
- **Teacher Controls** - Easy scoring and audio playback buttons
- **Progress Tracking** - Visual lives, scores, and accuracy percentages
- **Flexible Timing** - Pause/resume and time adjustment features

## 🔧 Customization

### Adding Word Lists
1. Click **"+ Add Word List"** in setup
2. Use the provided JSON template
3. Each word needs:
   ```json
   {
     "word": "example",
     "syllables": "ex-am-ple (3 syllables)",
     "definition": "A thing characteristic of its kind",
     "origin": "Latin 'exemplum' meaning sample",
     "sentence": "This is a good example.",
     "prefixSuffix": "Base word with no prefix or suffix",
     "pronunciation": "ig-ZAM-pul"
   }
   ```

### Modifying Game Settings
Edit `app.js` to change:
- **Timer Duration** - Modify `setTimeLeft(30)` 
- **Lives Count** - Change `lives = gameMode === 'individual' ? 5 : 10`
- **Help Shop Costs** - Adjust point costs in `useHelpItem` function
- **Team Colors** - Modify `getTeamColor` array
- **Difficulty Progression** - Update `difficultyProgression` array

## 🎯 Game Flow

### Setup Phase
1. Choose game mode (Individual/Team)
2. Add students/teams
3. Select word list
4. Start game

### Gameplay Phase  
1. Student/team sees word information
2. 30-second timer counts down
3. Student attempts to spell word
4. Teacher marks correct/incorrect
5. Points awarded and lives adjusted
6. Next turn with auto-difficulty progression

### Help Shop Usage
- Teams start with 1 point
- Earn 1 point per correct word
- Spend points on helpful hints
- Strategic decision-making adds engagement

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox  
- ✅ Safari
- ✅ Mobile browsers
- 🔊 Audio features work best in Chrome/Edge

## 🔄 Future Enhancements

Planned features:
- [ ] Export/import word lists as files
- [ ] Student progress reports
- [ ] More help shop items (hangman-style reveals, friend substitution)
- [ ] Custom timer durations per difficulty
- [ ] Multiplayer across devices
- [ ] Word frequency analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes  
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

For questions, suggestions, or issues:
- Open an issue on GitHub
- Check existing issues for solutions
- Contribute improvements via pull requests

---

**Perfect for educators, students, and spelling enthusiasts!** 🎓✨
