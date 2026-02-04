import { useState, useRef } from 'react';
import type { SFXVideo } from '@/types';
import { MoreHorizontal, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface SFXGalleryProps {
  videos: SFXVideo[];
}

export function SFXGallery({ videos }: SFXGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<SFXVideo | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => setSelectedVideo(video)}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black border-none overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedVideo?.title || 'Video Player'}
          </DialogTitle>
          {selectedVideo && (
            <VideoPlayer 
              video={selectedVideo} 
              onClose={() => setSelectedVideo(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface VideoCardProps {
  video: SFXVideo;
  onClick: () => void;
  delay: number;
}

function VideoCard({ video, onClick, delay }: VideoCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Video Thumbnail */}
      <div 
        className={cn(
          "relative aspect-video rounded-2xl overflow-hidden",
          "bg-secondary",
          "transition-all duration-300 ease-out-expo",
          "group-hover:translate-y-[-4px] group-hover:shadow-xl"
        )}
      >
        {/* Thumbnail Image */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className={cn(
            "w-full h-full object-cover",
            "transition-all duration-300 ease-out-expo",
            "group-hover:scale-105"
          )}
          loading="lazy"
        />

        {/* Dark Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/40",
            "transition-opacity duration-300",
            "group-hover:bg-black/50"
          )}
        />

        {/* Play Button */}
        <div 
          className={cn(
            "absolute inset-0",
            "flex items-center justify-center"
          )}
        >
          <div
            className={cn(
              "w-16 h-16 rounded-full",
              "flex items-center justify-center",
              "bg-white/20 backdrop-blur-sm text-white",
              "group-hover:bg-primary group-hover:text-primary-foreground",
              "group-hover:scale-110",
              "transition-all duration-300 ease-out-expo"
            )}
          >
            <Play className="w-7 h-7 fill-current ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div 
          className={cn(
            "absolute bottom-3 right-3",
            "px-2 py-1 rounded-md",
            "bg-black/70 text-white text-sm font-medium"
          )}
        >
          {video.duration}
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-3 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {video.createdAt}
          </p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Show video options menu
          }}
          className={cn(
            "w-8 h-8 rounded-full flex-shrink-0",
            "flex items-center justify-center",
            "text-muted-foreground hover:text-foreground hover:bg-secondary",
            "transition-all duration-200",
            "opacity-0 group-hover:opacity-100"
          )}
          aria-label="Video options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface VideoPlayerProps {
  video: SFXVideo;
  onClose: () => void;
}

function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <div className="relative w-full bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full aspect-video"
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Controls Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
        {/* Top - Title */}
        <div className="flex items-start justify-between">
          <h3 className="text-white font-medium text-lg">{video.title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Bottom - Controls */}
        <div className="space-y-2">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
