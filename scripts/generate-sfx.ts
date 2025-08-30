import fs from 'fs';
import path from 'path';
import { mcp0_text_to_sound_effects } from '../../mcp/elevenlabs';

// Output directory for sound effects
const OUTPUT_DIR = path.join(__dirname, '../public/audio/sfx');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Sound effects to generate
const soundEffects = [
  {
    name: 'correct',
    description: 'A short, cheerful ding sound for correct answers',
    duration: 1.5
  },
  {
    name: 'wrong',
    description: 'A short, soft buzz sound for incorrect answers',
    duration: 1.0
  },
  {
    name: 'level_up',
    description: 'A celebratory chime for leveling up',
    duration: 2.5
  },
  {
    name: 'ui_click',
    description: 'A subtle click sound for UI interactions',
    duration: 0.3
  },
  {
    name: 'page_turn',
    description: 'The sound of a page turning in a book',
    duration: 1.0
  },
  {
    name: 'success',
    description: 'A triumphant fanfare for completing a level',
    duration: 3.0
  }
];

// Generate sound effects
async function generateSoundEffects() {
  console.log('Generating sound effects...');
  
  for (const sfx of soundEffects) {
    const outputPath = path.join(OUTPUT_DIR, `${sfx.name}.mp3`);
    
    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`Skipping ${sfx.name} - already exists`);
      continue;
    }
    
    try {
      console.log(`Generating: ${sfx.name}`);
      
      const result = await mcp0_text_to_sound_effects({
        text: sfx.description,
        duration_seconds: sfx.duration,
        output_format: 'mp3_44100_128'
      });
      
      if (result && result.output_file) {
        // Move the file to our output directory
        const tempPath = result.output_file;
        if (fs.existsSync(tempPath)) {
          fs.renameSync(tempPath, outputPath);
          console.log(`Created: ${outputPath}`);
        }
      }
      
      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error generating ${sfx.name}:`, error);
    }
  }
  
  console.log('Sound effect generation complete!');
}

// Run the script
generateSoundEffects().catch(console.error);
