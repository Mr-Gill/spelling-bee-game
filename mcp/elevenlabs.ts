import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';
const API_BASE_URL = 'https://api.elevenlabs.io/v1';
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel's voice ID - clear and friendly

// Types
interface TextToSpeechOptions {
  text: string;
  voice_id?: string;
  model_id?: string;
  output_format?: string;
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
  output_directory?: string;
}

interface SoundEffectOptions {
  text: string;
  duration_seconds: number;
  output_format?: string;
  output_directory?: string;
}

// Helper function to make API requests
async function makeApiRequest(endpoint: string, method = 'GET', data: any = null, responseType: 'json' | 'arraybuffer' = 'json') {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'xi-api-key': ELEVENLABS_API_KEY,
    'Content-Type': 'application/json',
    'Accept': responseType === 'arraybuffer' ? 'audio/mpeg' : 'application/json'
  };

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: data ? JSON.stringify(data) : undefined,
      responseType
    });
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
}

// Text to Speech
export async function mcp0_text_to_speech(options: TextToSpeechOptions) {
  const {
    text,
    voice_id = DEFAULT_VOICE_ID,
    model_id = 'eleven_monolingual_v1',
    output_format = 'mp3_44100_128',
    stability = 0.5,
    similarity_boost = 0.75,
    style = 0,
    use_speaker_boost = true,
    output_directory = process.cwd()
  } = options;

  try {
    // Generate speech
    const audioData = await makeApiRequest(
      `/text-to-speech/${voice_id}`,
      'POST',
      {
        text,
        model_id,
        voice_settings: {
          stability,
          similarity_boost,
          style,
          use_speaker_boost
        }
      },
      'arraybuffer'
    ) as ArrayBuffer;

    // Save to file if output directory is provided
    let outputFile = '';
    if (output_directory) {
      const fileName = `tts_${Date.now()}.${output_format.split('_')[0]}`;
      outputFile = path.join(output_directory, fileName);
      
      // Ensure directory exists
      fs.mkdirSync(output_directory, { recursive: true });
      
      // Save the file
      fs.writeFileSync(outputFile, Buffer.from(audioData));
    }

    return {
      success: true,
      audioData,
      output_file: outputFile,
      format: output_format
    };
  } catch (error) {
    console.error('Error in text-to-speech:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Text to Sound Effects
export async function mcp0_text_to_sound_effects(options: SoundEffectOptions) {
  const {
    text,
    duration_seconds,
    output_format = 'mp3_44100_128',
    output_directory = process.cwd()
  } = options;

  try {
    // Generate sound effect
    const audioData = await makeApiRequest(
      '/sound-effects/generate',
      'POST',
      {
        text,
        duration_seconds,
        output_format
      },
      'arraybuffer'
    ) as ArrayBuffer;

    // Save to file if output directory is provided
    let outputFile = '';
    if (output_directory) {
      const fileName = `sfx_${Date.now()}.${output_format.split('_')[0]}`;
      outputFile = path.join(output_directory, fileName);
      
      // Ensure directory exists
      fs.mkdirSync(output_directory, { recursive: true });
      
      // Save the file
      fs.writeFileSync(outputFile, Buffer.from(audioData));
    }

    return {
      success: true,
      audioData,
      output_file: outputFile,
      format: output_format
    };
  } catch (error) {
    console.error('Error in text-to-sound-effects:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// List available voices
export async function mcp0_list_voices() {
  try {
    const voices = await makeApiRequest('/voices');
    return {
      success: true,
      voices
    };
  } catch (error) {
    console.error('Error listing voices:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      voices: []
    };
  }
}

// Get voice details
export async function mcp0_get_voice(voice_id: string) {
  try {
    const voice = await makeApiRequest(`/voices/${voice_id}`);
    return {
      success: true,
      voice
    };
  } catch (error) {
    console.error(`Error getting voice ${voice_id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      voice: null
    };
  }
}
