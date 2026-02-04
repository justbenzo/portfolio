import type { Folder, SFXVideo, Track } from '@/types';

// Sample MP3 URLs (using placeholder audio files)
const SAMPLE_MP3_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const SAMPLE_MP3_URL_2 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
const SAMPLE_MP3_URL_3 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3';

// Sample Video URL (using placeholder)
const SAMPLE_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

// Album art images - dreamy/liminal aesthetic
const albumArts = {
  pool: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=400&fit=crop',
  desert: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop',
  doorway: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
  mushrooms: 'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400&h=400&fit=crop',
  grass: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  space: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=400&fit=crop',
  water: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
  abstract: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop',
  gradient: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop',
  city: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop',
};

// SFX Video thumbnails
const videoThumbnails = {
  sfx1: 'https://files.catbox.moe/sq8dhd.mp4',
  sfx2: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=640&h=360&fit=crop',
  sfx3: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=640&h=360&fit=crop',
  sfx4: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=640&h=360&fit=crop',
};

// Liminal Folder Tracks
export const liminalTracks: Track[] = [
  {
    id: 'track-1',
    title: 'a comforting enclosure',
    artist: 'justbenzo',
    coverImage: albumArts.pool,
    totalDuration: '7m 24s',
    createdAt: '2024-01-15',
    songs: [
      {
        id: 'song-1-1',
        title: 'a comforting enclosure',
        duration: '7:24',
        audioUrl: SAMPLE_MP3_URL,
        addedAt: '27 minutes ago',
      },
      {
        id: 'song-1-2',
        title: 'submerged memories',
        duration: '4:12',
        audioUrl: SAMPLE_MP3_URL_2,
      },
      {
        id: 'song-1-3',
        title: 'floating dreams',
        duration: '3:45',
        audioUrl: SAMPLE_MP3_URL_3,
      },
    ],
  },
  {
    id: 'track-2',
    title: "don't believe the grass",
    artist: 'justbenzo',
    coverImage: albumArts.grass,
    totalDuration: '5m 18s',
    createdAt: '2024-01-10',
    songs: [
      {
        id: 'song-2-1',
        title: "don't believe the grass",
        duration: '5:18',
        audioUrl: SAMPLE_MP3_URL_2,
      },
      {
        id: 'song-2-2',
        title: 'whispers in the wind',
        duration: '3:33',
        audioUrl: SAMPLE_MP3_URL_3,
      },
    ],
  },
  {
    id: 'track-3',
    title: 'beware the sand',
    artist: 'justbenzo',
    coverImage: albumArts.desert,
    totalDuration: '6m 42s',
    createdAt: '2024-01-05',
    songs: [
      {
        id: 'song-3-1',
        title: 'beware the sand',
        duration: '6:42',
        audioUrl: SAMPLE_MP3_URL_3,
      },
      {
        id: 'song-3-2',
        title: 'desert winds',
        duration: '4:20',
        audioUrl: SAMPLE_MP3_URL,
      },
      {
        id: 'song-3-3',
        title: 'mirage',
        duration: '2:55',
        audioUrl: SAMPLE_MP3_URL_2,
      },
    ],
  },
  {
    id: 'track-4',
    title: 'space hides in tall grass',
    artist: 'justbenzo',
    coverImage: albumArts.doorway,
    totalDuration: '8m 15s',
    createdAt: '2024-01-01',
    songs: [
      {
        id: 'song-4-1',
        title: 'space hides in tall grass',
        duration: '8:15',
        audioUrl: SAMPLE_MP3_URL,
      },
      {
        id: 'song-4-2',
        title: 'cosmic doorway',
        duration: '5:30',
        audioUrl: SAMPLE_MP3_URL_2,
      },
    ],
  },
  {
    id: 'track-5',
    title: 'the water holds memories',
    artist: 'justbenzo',
    coverImage: albumArts.mushrooms,
    totalDuration: '4m 56s',
    createdAt: '2023-12-20',
    songs: [
      {
        id: 'song-5-1',
        title: 'the water holds memories',
        duration: '4:56',
        audioUrl: SAMPLE_MP3_URL_2,
      },
      {
        id: 'song-5-2',
        title: 'underwater garden',
        duration: '3:22',
        audioUrl: SAMPLE_MP3_URL_3,
      },
      {
        id: 'song-5-3',
        title: 'fungal dreams',
        duration: '2:48',
        audioUrl: SAMPLE_MP3_URL,
      },
    ],
  },
];

// Miscellaneous Folder Tracks
export const miscellaneousTracks: Track[] = [
  {
    id: 'track-m1',
    title: 'neon reflections',
    artist: 'justbenzo',
    coverImage: albumArts.city,
    totalDuration: '5m 30s',
    createdAt: '2024-02-01',
    songs: [
      {
        id: 'song-m1-1',
        title: 'neon reflections',
        duration: '5:30',
        audioUrl: SAMPLE_MP3_URL,
      },
    ],
  },
  {
    id: 'track-m2',
    title: 'abstract thoughts',
    artist: 'justbenzo',
    coverImage: albumArts.abstract,
    totalDuration: '3m 45s',
    createdAt: '2024-01-25',
    songs: [
      {
        id: 'song-m2-1',
        title: 'abstract thoughts',
        duration: '3:45',
        audioUrl: SAMPLE_MP3_URL_2,
      },
    ],
  },
];

// Folders
export const folders: Folder[] = [
  {
    id: 'folder-1',
    name: 'miscellaneous',
    artist: 'justbenzo',
    coverImages: [
      albumArts.gradient,
      albumArts.city,
      albumArts.abstract,
      albumArts.space,
    ],
    tracks: miscellaneousTracks,
    createdAt: '2024-01-01',
  },
  {
    id: 'folder-2',
    name: 'Liminal',
    artist: 'justbenzo',
    coverImages: [
      albumArts.pool,
      albumArts.grass,
      albumArts.desert,
      albumArts.doorway,
    ],
    tracks: liminalTracks,
    createdAt: '2023-12-01',
  },
];

// SFX Videos (1920x1080 MP4 with sound)
export const sfxVideos: SFXVideo[] = [
  {
    id: 'sfx-1',
    title: 'Ambient Drone Texture',
    thumbnail: videoThumbnails.sfx1,
    videoUrl: 'https://files.catbox.moe/sq8dhd.mp4',
    duration: '0:15',
    createdAt: '2024-02-01',
  },
  {
    id: 'sfx-2',
    title: 'Cinematic Impact',
    thumbnail: videoThumbnails.sfx2,
    videoUrl: SAMPLE_VIDEO_URL,
    duration: '0:08',
    createdAt: '2024-01-28',
  },
  {
    id: 'sfx-3',
    title: 'Synth Wave Pulse',
    thumbnail: videoThumbnails.sfx3,
    videoUrl: SAMPLE_VIDEO_URL,
    duration: '0:12',
    createdAt: '2024-01-25',
  },
  {
    id: 'sfx-4',
    title: 'Atmospheric Layer',
    thumbnail: videoThumbnails.sfx4,
    videoUrl: SAMPLE_VIDEO_URL,
    duration: '0:20',
    createdAt: '2024-01-20',
  },
  {
    id: 'sfx-5',
    title: 'Glitch Transition',
    thumbnail: videoThumbnails.sfx1,
    videoUrl: SAMPLE_VIDEO_URL,
    duration: '0:05',
    createdAt: '2024-01-15',
  },
  {
    id: 'sfx-6',
    title: 'Bass Drop',
    thumbnail: videoThumbnails.sfx2,
    videoUrl: SAMPLE_VIDEO_URL,
    duration: '0:10',
    createdAt: '2024-01-10',
  },
];

// Get folder by ID
export function getFolderById(id: string): Folder | undefined {
  return folders.find((f) => f.id === id);
}

// Get track by ID
export function getTrackById(id: string): Track | undefined {
  for (const folder of folders) {
    const track = folder.tracks.find((t) => t.id === id);
    if (track) return track;
  }
  return undefined;
}

// Get SFX video by ID
export function getSFXVideoById(id: string): SFXVideo | undefined {
  return sfxVideos.find((v) => v.id === id);
}
