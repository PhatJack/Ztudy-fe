import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  url: string;
  volume: number;
  onVolumeChange?: (volume: number) => void;
  autoPlay?: boolean;
}

const AudioPlayer = ({ url, volume, onVolumeChange, autoPlay = false }: AudioPlayerProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const fetchAndPlayAudio = async () => {
      try {
        // Fetch audio data
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        
        // Decode audio data
        const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer);
        
        // Create and configure nodes
        const source = audioContextRef.current!.createBufferSource();
        source.buffer = audioBuffer;
        
        const gainNode = audioContextRef.current!.createGain();
        gainNode.gain.value = volume;
        
        // Connect nodes
        source.connect(gainNode);
        gainNode.connect(audioContextRef.current!.destination);
        
        // Store references
        sourceNodeRef.current = source;
        gainNodeRef.current = gainNode;
        
        // Start playing if autoPlay is true
        if (autoPlay) {
          source.start(0);
          setIsPlaying(true);
        }

        // Handle end of playback
        source.onended = () => {
          setIsPlaying(false);
        };
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    fetchAndPlayAudio();

    // Cleanup
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [url, autoPlay]);

  // Handle volume changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
      onVolumeChange?.(volume);
    }
  }, [volume, onVolumeChange]);

  const togglePlayback = () => {
    if (!sourceNodeRef.current || !audioContextRef.current) return;

    if (isPlaying) {
      sourceNodeRef.current.stop();
      setIsPlaying(false);
    } else {
      // Need to create a new source node after stopping
      const source = audioContextRef.current.createBufferSource();
      source.buffer = sourceNodeRef.current.buffer;
      source.connect(gainNodeRef.current!);
      source.start(0);
      sourceNodeRef.current = source;
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePlayback}
        className="px-4 py-2 bg-primary text-white rounded-md"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="text-sm">
        Volume: {Math.round(volume * 100)}%
      </div>
    </div>
  );
};

export default AudioPlayer; 