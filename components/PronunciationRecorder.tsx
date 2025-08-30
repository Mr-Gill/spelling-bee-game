import React, { useEffect, useRef, useState } from 'react';

interface PronunciationRecorderProps {
  id: string;
  sampleUrl: string;
}

function dataURLToBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

async function drawWaveformFromUrl(url: string, canvas?: HTMLCanvasElement | null) {
  if (!canvas) return;
  const ctx = new AudioContext();
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const audioBuf = await ctx.decodeAudioData(buf);
  drawBuffer(canvas, audioBuf);
}

async function drawWaveformFromBlob(blob: Blob, canvas?: HTMLCanvasElement | null) {
  if (!canvas) return;
  const ctx = new AudioContext();
  const buf = await blob.arrayBuffer();
  const audioBuf = await ctx.decodeAudioData(buf);
  drawBuffer(canvas, audioBuf);
}

function drawBuffer(canvas: HTMLCanvasElement, buffer: AudioBuffer) {
  const raw = buffer.getChannelData(0);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  const step = Math.ceil(raw.length / width);
  const amp = height / 2;
  for (let i = 0; i < width; i++) {
    let min = 1.0;
    let max = -1.0;
    for (let j = 0; j < step; j++) {
      const datum = raw[i * step + j];
      if (datum < min) min = datum;
      if (datum > max) max = datum;
    }
    ctx.lineTo(i, (1 + min) * amp);
    ctx.lineTo(i, (1 + max) * amp);
  }
  ctx.stroke();
}

const PronunciationRecorder: React.FC<PronunciationRecorderProps> = ({ id, sampleUrl }) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Blob | null>(null);
  const sampleCanvasRef = useRef<HTMLCanvasElement>(null);
  const recordCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    drawWaveformFromUrl(sampleUrl, sampleCanvasRef.current);
  }, [sampleUrl]);

  useEffect(() => {
    const stored = sessionStorage.getItem(`recording-${id}`);
    if (stored) {
      const blob = dataURLToBlob(stored);
      setRecording(blob);
      drawWaveformFromBlob(blob, recordCanvasRef.current);
    }
  }, [id]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setRecording(blob);
      const reader = new FileReader();
      reader.onloadend = () => {
        sessionStorage.setItem(`recording-${id}`, reader.result as string);
      };
      reader.readAsDataURL(blob);
      drawWaveformFromBlob(blob, recordCanvasRef.current);
    };
    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <button onClick={() => new Audio(sampleUrl).play()} className="px-2 py-1 bg-blue-500 text-white rounded">
          Play Sample
        </button>
        {isRecording ? (
          <button onClick={stopRecording} className="px-2 py-1 bg-red-500 text-white rounded">
            Stop
          </button>
        ) : (
          <button onClick={startRecording} className="px-2 py-1 bg-green-500 text-white rounded">
            Record
          </button>
        )}
        {recording && (
          <button onClick={() => audioRef.current?.play()} className="px-2 py-1 bg-gray-500 text-white rounded">
            Play
          </button>
        )}
      </div>
      <div className="flex space-x-2">
        <div className="flex flex-col items-center">
          <canvas ref={sampleCanvasRef} width={150} height={60} className="border" />
          <span className="text-sm">Sample</span>
        </div>
        <div className="flex flex-col items-center">
          <canvas ref={recordCanvasRef} width={150} height={60} className="border" />
          <span className="text-sm">You</span>
        </div>
      </div>
      {recording && <audio ref={audioRef} src={URL.createObjectURL(recording)} />}
    </div>
  );
};

export default PronunciationRecorder;

