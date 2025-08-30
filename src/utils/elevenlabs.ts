import { mcp0_text_to_speech } from '../../mcp/elevenlabs';

interface ElevenLabsOptions {
  voiceId?: string;
  modelId?: string;
  outputFormat?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  speakerBoost?: boolean;
}

export async function generateSpeech(
  text: string, 
  options: ElevenLabsOptions = {}
): Promise<{ audioData: ArrayBuffer; mimeType: string } | null> {
  try {
    const {
      voiceId = '21m00Tcm4TlvDq8ikWAM', // Rachel's voice ID - clear and friendly
      modelId = 'eleven_monolingual_v1',
      outputFormat = 'mp3_44100_128',
      stability = 0.5,
      similarityBoost = 0.75,
      style = 0,
      speakerBoost = true
    } = options;

    const result = await mcp0_text_to_speech({
      text,
      voice_id: voiceId,
      model_id: modelId,
      output_format: outputFormat,
      stability,
      similarity_boost: similarityBoost,
      style,
      use_speaker_boost: speakerBoost,
    });

    if (result && result.audioData) {
      return {
        audioData: result.audioData,
        mimeType: getMimeType(outputFormat)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error generating speech:', error);
    return null;
  }
}

function getMimeType(outputFormat: string): string {
  if (outputFormat.startsWith('mp3')) return 'audio/mpeg';
  if (outputFormat.startsWith('pcm')) return 'audio/wav';
  if (outputFormat.startsWith('ulaw') || outputFormat.startsWith('alaw')) return 'audio/wav';
  if (outputFormat.startsWith('opus')) return 'audio/ogg; codecs=opus';
  return 'audio/mpeg'; // default to mp3
}

export async function saveAudioToFile(
  text: string, 
  filePath: string, 
  options: ElevenLabsOptions = {}
): Promise<boolean> {
  try {
    const result = await generateSpeech(text, options);
    if (!result) return false;
    
    const fs = await import('fs/promises');
    const path = await import('path');
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Save the audio file
    await fs.writeFile(filePath, Buffer.from(result.audioData));
    return true;
  } catch (error) {
    console.error(`Error saving audio to ${filePath}:`, error);
    return false;
  }
}

export async function generateWordAudioFiles(
  words: string[],
  outputDir: string,
  options: ElevenLabsOptions = {}
): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  // Process words in batches to avoid rate limiting
  const batchSize = 5;
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    const promises = batch.map(async (word) => {
      const safeWord = word.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const filePath = path.join(outputDir, `${safeWord}.mp3`);
      
      // Skip if file already exists
      try {
        await fs.access(filePath);
        console.log(`Skipping ${word} - already exists`);
        return;
      } catch {
        // File doesn't exist, generate it
      }
      
      console.log(`Generating audio for: ${word}`);
      const success = await saveAudioToFile(word, filePath, options);
      if (success) {
        console.log(`Generated: ${filePath}`);
      } else {
        console.error(`Failed to generate: ${word}`);
      }
      
      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 300));
    });
    
    await Promise.all(promises);
    
    // Add a slightly longer delay between batches
    if (i + batchSize < words.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
