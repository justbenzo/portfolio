import { useState, useCallback } from 'react';
import type { Folder, Track, SectionType, ViewState } from '@/types';
import { folders, sfxVideos } from '@/data/musicData';
import { Header } from '@/components/Header';
import { FolderGrid } from '@/components/FolderGrid';
import { TrackList } from '@/components/TrackList';
import { TrackDetail } from '@/components/TrackDetail';
import { SFXGallery } from '@/components/SFXGallery';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  // Navigation state
  const [section, setSection] = useState<SectionType>('music');
  const [view, setView] = useState<ViewState>('folders');
  
  // Selected items
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  
  // Player state
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Navigation handlers
  const handleSectionChange = useCallback((newSection: SectionType) => {
    setSection(newSection);
    if (newSection === 'sfx') {
      setView('sfx');
    } else {
      setView('folders');
      setSelectedFolder(null);
      setSelectedTrack(null);
    }
  }, []);

  const handleFolderClick = useCallback((folder: Folder) => {
    setSelectedFolder(folder);
    setView('tracks');
  }, []);

  const handleTrackClick = useCallback((track: Track) => {
    setSelectedTrack(track);
    setView('track-detail');
  }, []);

  const handleBack = useCallback(() => {
    if (view === 'track-detail') {
      setView('tracks');
      setSelectedTrack(null);
    } else if (view === 'tracks') {
      setView('folders');
      setSelectedFolder(null);
    } else if (view === 'sfx') {
      setSection('music');
      setView('folders');
    }
  }, [view]);

  // Player handlers
  const handlePlayTrack = useCallback((track: Track, songIndex: number = 0) => {
    if (currentTrack?.id === track.id && currentSongIndex === songIndex) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setCurrentSongIndex(songIndex);
      setIsPlaying(true);
    }
  }, [currentTrack, currentSongIndex]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    if (currentTrack) {
      const nextIndex = (currentSongIndex + 1) % currentTrack.songs.length;
      setCurrentSongIndex(nextIndex);
    }
  }, [currentTrack, currentSongIndex]);

  const handlePrevious = useCallback(() => {
    if (currentTrack) {
      const prevIndex = currentSongIndex === 0 
        ? currentTrack.songs.length - 1 
        : currentSongIndex - 1;
      setCurrentSongIndex(prevIndex);
    }
  }, [currentTrack, currentSongIndex]);

  // Render current view
  const renderContent = () => {
    switch (view) {
      case 'folders':
        return (
          <FolderGrid 
            folders={folders} 
            onFolderClick={handleFolderClick}
          />
        );
      case 'tracks':
        return selectedFolder ? (
          <TrackList 
            folder={selectedFolder}
            onTrackClick={handleTrackClick}
            onPlayTrack={handlePlayTrack}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        ) : null;
      case 'track-detail':
        return selectedTrack ? (
          <TrackDetail 
            track={selectedTrack}
            onPlayTrack={handlePlayTrack}
            currentTrack={currentTrack}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
          />
        ) : null;
      case 'sfx':
        return <SFXGallery videos={sfxVideos} />;
      default:
        return null;
    }
  };

  // Get page title
  const getPageTitle = () => {
    if (view === 'folders') return 'portfolio';
    if (view === 'tracks') return selectedFolder?.name || 'tracks';
    if (view === 'track-detail') return selectedTrack?.title || 'track';
    if (view === 'sfx') return 'sfx work';
    return 'portfolio';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header 
        section={section}
        onSectionChange={handleSectionChange}
        onBack={view !== 'folders' || section === 'sfx' ? handleBack : undefined}
        pageTitle={getPageTitle()}
        // showBack={view !== 'folders' || section === 'sfx'}
      />

      {/* Main Content */}
      <main className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>

      {/* Audio Player */}
      {currentTrack && (
        <AudioPlayer
          track={currentTrack}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;
