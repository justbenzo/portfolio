import type { Track } from '@/types';
import { MoreHorizontal, Play, Pause, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackDetailProps {
  track: Track;
  onPlayTrack: (track: Track, songIndex: number) => void;
  currentTrack: Track | null;
  currentSongIndex: number;
  isPlaying: boolean;
}

export function TrackDetail({ 
  track, 
  onPlayTrack,
  currentTrack,
  currentSongIndex,
  isPlaying 
}: TrackDetailProps) {
  const isCurrentTrack = currentTrack?.id === track.id;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left - Album Art */}
        <div className="flex justify-center md:justify-start">
          <div 
            className={cn(
              "relative w-full max-w-md aspect-square rounded-3xl overflow-hidden",
              "bg-secondary shadow-2xl",
              "transition-transform duration-500 ease-out-expo",
              "hover:scale-[1.02] hover:rotate-1"
            )}
          >
            <img
              src={track.coverImage}
              alt={track.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>

        {/* Right - Track Info */}
        <div className="flex flex-col">
          {/* Title & Info */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
              {track.title}
            </h1>
            <p className="text-muted-foreground">
              {track.artist} · {track.songs.length} {track.songs.length === 1 ? 'track' : 'tracks'} · {track.totalDuration}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-8">
            {/* Play Button */}
            <button
              onClick={() => onPlayTrack(track, 0)}
              className={cn(
                "w-16 h-16 rounded-full",
                "flex items-center justify-center",
                "bg-white text-black",
                "hover:scale-110 hover:shadow-lg",
                "transition-all duration-300 ease-elastic",
                isCurrentTrack && isPlaying && "animate-pulse-glow"
              )}
              aria-label={isCurrentTrack && isPlaying ? "Pause" : "Play"}
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-1" />
              )}
            </button>

            {/* Add Tracks Button */}
            <button
              className={cn(
                "flex items-center justify-center gap-2 px-6 py-3 rounded-full",
                "bg-secondary text-foreground font-medium",
                "hover:bg-muted hover:scale-105",
                "transition-all duration-300 ease-out-expo"
              )}
            >
              <Plus className="w-5 h-5" />
              <span>Add tracks</span>
            </button>
          </div>

          {/* Song List */}
          <div className="flex-1">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Tracks
            </h2>
            <div className="space-y-1">
              {track.songs.map((song, index) => {
                const isCurrentSong = isCurrentTrack && currentSongIndex === index;
                
                return (
                  <div
                    key={song.id}
                    onClick={() => onPlayTrack(track, index)}
                    className={cn(
                      "group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer",
                      "transition-all duration-200 ease-out-expo",
                      "hover:bg-secondary/80 hover:translate-x-1",
                      isCurrentSong && "bg-secondary border-l-2 border-primary"
                    )}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    {/* Track Number / Play Icon */}
                    <div className="w-8 flex-shrink-0 flex justify-center">
                      {isCurrentSong && isPlaying ? (
                        <div className="flex items-end gap-0.5 h-4">
                          <span className="w-1 bg-primary animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                          <span className="w-1 bg-primary animate-pulse" style={{ height: '100%', animationDelay: '100ms' }} />
                          <span className="w-1 bg-primary animate-pulse" style={{ height: '40%', animationDelay: '200ms' }} />
                        </div>
                      ) : (
                        <span className={cn(
                          "text-sm text-muted-foreground group-hover:hidden",
                          isCurrentSong && "text-primary"
                        )}>
                          {index + 1}
                        </span>
                      )}
                      <Play className={cn(
                        "w-4 h-4 text-foreground hidden group-hover:block fill-current",
                        isCurrentSong && "text-primary"
                      )} />
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-base font-medium truncate",
                        isCurrentSong ? "text-primary" : "text-foreground"
                      )}>
                        {song.title}
                      </p>
                      {song.addedAt && (
                        <p className="text-xs text-muted-foreground">{song.addedAt}</p>
                      )}
                    </div>

                    {/* Duration */}
                    <span className="text-sm text-muted-foreground flex-shrink-0">
                      {song.duration}
                    </span>

                    {/* Options */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Show song options menu
                      }}
                      className={cn(
                        "w-8 h-8 rounded-full flex-shrink-0",
                        "flex items-center justify-center",
                        "text-muted-foreground hover:text-foreground hover:bg-secondary",
                        "transition-all duration-200",
                        "opacity-0 group-hover:opacity-100"
                      )}
                      aria-label="Song options"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
