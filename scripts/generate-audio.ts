import fs from 'fs';
import path from 'path';
import { mcp0_text_to_speech } from '../src/utils/elevenlabs';

// Audio configuration
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel's voice ID - clear and friendly
const OUTPUT_DIR = path.join(__dirname, '../public/audio');

// Create output directories if they don't exist
const dirs = [
  path.join(OUTPUT_DIR, 'ui'),
  path.join(OUTPUT_DIR, 'feedback'),
  path.join(OUTPUT_DIR, 'words')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// UI Sounds
const uiSounds = [
  { text: 'Click', file: 'ui_click.mp3' },
  { text: 'Back', file: 'ui_back.mp3' },
  { text: 'Select', file: 'ui_select.mp3' },
  { text: 'Next', file: 'ui_next.mp3' },
  { text: 'Start', file: 'ui_start.mp3' },
  { text: 'Submit', file: 'ui_submit.mp3' },
];

// Feedback Sounds
const feedbackSounds = [
  { text: 'Correct!', file: 'correct.mp3' },
  { text: 'Great job!', file: 'great_job.mp3' },
  { text: 'Try again', file: 'try_again.mp3' },
  { text: 'Incorrect', file: 'wrong.mp3' },
  { text: 'Level up!', file: 'level_up.mp3' },
  { text: 'Perfect!', file: 'perfect.mp3' },
];

// Common words for the spelling bee
const spellingWords = [
  'apple', 'banana', 'cat', 'dog', 'elephant', 'flower', 'giraffe', 'house', 'island', 'jungle',
  'kangaroo', 'lion', 'mountain', 'notebook', 'orange', 'pencil', 'queen', 'rainbow', 'sun', 'tree'
];

// Generate audio files
async function generateAudioFiles() {
  console.log('Starting audio generation...');
  
  // Generate UI sounds
  console.log('\nGenerating UI sounds...');
  for (const sound of uiSounds) {
    await generateAudio(sound.text, path.join('ui', sound.file));
  }
  
  // Generate feedback sounds
  console.log('\nGenerating feedback sounds...');
  for (const sound of feedbackSounds) {
    await generateAudio(sound.text, path.join('feedback', sound.file));
  }
  
  // Generate word pronunciations
  console.log('\nGenerating word pronunciations...');
  for (const word of spellingWords) {
    await generateAudio(word, path.join('words', `${word}.mp3`));
  }
  
  console.log('\nAll audio files generated successfully!');
}

// Helper function to generate a single audio file
async function generateAudio(text: string, filename: string) {
  const outputPath = path.join(OUTPUT_DIR, filename);
  
  // Skip if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${filename} - already exists`);
    return;
  }
  
  try {
    console.log(`Generating: ${filename}`);
    const result = await mcp0_text_to_speech({
      text: text,
      voice_id: VOICE_ID,
      output_format: 'mp3_44100_128',
      output_directory: OUTPUT_DIR
    });
    
    // Rename the output file
    if (result && result.output_file) {
      const tempPath = path.join(OUTPUT_DIR, path.basename(result.output_file));
      if (fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, outputPath);
        console.log(`Created: ${filename}`);
      }
    }
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
  }
  
  // Add a small delay between requests
  await new Promise(resolve => setTimeout(resolve, 500));
}

// Run the script
generateAudioFiles().catch(console.error);
