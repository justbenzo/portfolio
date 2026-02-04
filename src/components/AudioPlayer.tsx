import { useRef, useEffect, useState } from 'react';
import type { Track } from '@/types';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  track: Track;
  currentSongIndex: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function AudioPlayer({
  track,
  currentSongIndex,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentSong = track.songs[currentSongIndex];

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play blocked, ignore
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex, track.id]);

  // Handle song change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play blocked, ignore
        });
      }
    }
  }, [currentSong.audioUrl]);

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleEnded = () => {
    if (currentSongIndex < track.songs.length - 1) {
      onNext();
    } else {
      onPlayPause();
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-background/95 backdrop-blur-xl border-t border-border",
        "px-4 py-3"
      )}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full px-4 pb-2">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleSeek}
          className="w-full cursor-pointer"
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={track.coverImage}
            alt={track.title}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {currentSong.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {track.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            className={cn(
              "w-10 h-10 rounded-full",
              "flex items-center justify-center",
              "text-foreground hover:bg-secondary",
              "transition-all duration-200"
            )}
            aria-label="Previous"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={onPlayPause}
            className={cn(
              "w-12 h-12 rounded-full",
              "flex items-center justify-center",
              "bg-primary text-primary-foreground",
              "hover:scale-105 hover:shadow-lg",
              "transition-all duration-200 ease-out-expo"
            )}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            className={cn(
              "w-10 h-10 rounded-full",
              "flex items-center justify-center",
              "text-foreground hover:bg-secondary",
              "transition-all duration-200"
            )}
            aria-label="Next"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Time & Volume */}
        <div className="hidden sm:flex items-center gap-4 flex-1 justify-end">
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex items-center gap-2 w-32">
            <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
}
