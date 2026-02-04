import type { Folder, Track } from '@/types';
import { MoreHorizontal, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackListProps {
  folder: Folder;
  onTrackClick: (track: Track) => void;
  onPlayTrack: (track: Track, songIndex?: number) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
}

export function TrackList({ 
  folder, 
  onTrackClick, 
  onPlayTrack,
  currentTrack,
  isPlaying 
}: TrackListProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tracks Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {folder.tracks.map((track, index) => (
          <TrackCard
            key={track.id}
            track={track}
            onClick={() => onTrackClick(track)}
            onPlay={(e) => {
              e.stopPropagation();
              onPlayTrack(track, 0);
            }}
            isPlaying={currentTrack?.id === track.id && isPlaying}
            delay={index * 80}
          />
        ))}
      </div>

      {/* Add Button */}
      <div className="flex justify-center mt-12">
        <button
          className={cn(
            "flex items-center gap-2 px-8 py-3 rounded-full",
            "bg-secondary text-foreground font-medium",
            "hover:bg-muted hover:scale-105",
            "transition-all duration-300 ease-bounce",
            "animate-bounce-up"
          )}
          style={{ animationDelay: `${folder.tracks.length * 80 + 200}ms` }}
        >
          <span className="text-lg">+</span>
          <span>Add tracks</span>
        </button>
      </div>
    </div>
  );
}

interface TrackCardProps {
  track: Track;
  onClick: () => void;
  onPlay: (e: React.MouseEvent) => void;
  isPlaying: boolean;
  delay: number;
}

function TrackCard({ track, onClick, onPlay, isPlaying, delay }: TrackCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Album Art Container */}
      <div 
        className={cn(
          "relative aspect-square rounded-2xl overflow-hidden",
          "bg-secondary",
          "transition-all duration-300 ease-out-expo",
          "group-hover:translate-y-[-4px] group-hover:shadow-xl"
        )}
      >
        {/* Album Art */}
        <img
          src={track.coverImage}
          alt={track.title}
          className={cn(
            "w-full h-full object-cover",
            "transition-all duration-300 ease-out-expo",
            "group-hover:scale-105 group-hover:brightness-110"
          )}
          loading="lazy"
        />

        {/* Play Button Overlay */}
        <div 
          className={cn(
            "absolute inset-0",
            "flex items-center justify-center",
            "bg-black/30",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300"
          )}
        >
          <button
            onClick={onPlay}
            className={cn(
              "w-14 h-14 rounded-full",
              "flex items-center justify-center",
              "bg-black/70 text-white",
              "hover:bg-primary hover:text-primary-foreground",
              "hover:scale-110",
              "transition-all duration-200 ease-out-expo",
              isPlaying && "animate-pulse-glow bg-primary text-primary-foreground"
            )}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Track Info */}
      <div className="mt-3 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {track.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Show track options menu
          }}
          className={cn(
            "w-8 h-8 rounded-full flex-shrink-0",
            "flex items-center justify-center",
            "text-muted-foreground hover:text-foreground hover:bg-secondary",
            "transition-all duration-200",
            "opacity-0 group-hover:opacity-100"
          )}
          aria-label="Track options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
