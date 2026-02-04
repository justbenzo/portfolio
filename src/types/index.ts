// Music Portfolio Types

export interface Song {
  id: string;
  title: string;
  duration: string; // e.g., "3:45"
  audioUrl: string; // MP3 file URL
  addedAt?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  songs: Song[]; // Multiple songs per track
  totalDuration?: string; // e.g., "7m 24s"
  createdAt?: string;
}

export interface Folder {
  id: string;
  name: string;
  artist: string;
  coverImages: string[]; // Up to 4 images for the grid
  tracks: Track[];
  createdAt?: string;
}

export interface SFXVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string; // MP4 file URL
  duration: string; // e.g., "0:15"
  createdAt?: string;
}

export type ViewState = 'folders' | 'tracks' | 'track-detail' | 'sfx';
export type SectionType = 'music' | 'sfx';

export interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentSong: Song | null;
  currentTime: number;
  duration: number;
  volume: number;
}
