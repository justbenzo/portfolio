import type { Folder } from '@/types';
import { MoreHorizontal, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FolderGridProps {
  folders: Folder[];
  onFolderClick: (folder: Folder) => void;
}

export function FolderGrid({ folders, onFolderClick }: FolderGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Folders Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        style={{ perspective: '1000px' }}
      >
        {folders.map((folder, index) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onClick={() => onFolderClick(folder)}
            delay={index * 100}
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
          style={{ animationDelay: '400ms' }}
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}

interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
  delay: number;
}

function FolderCard({ folder, onClick, delay }: FolderCardProps) {
  // Get up to 4 images for the grid
  const images = folder.coverImages.slice(0, 4);
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Folder Image Grid */}
      <div 
        className={cn(
          "relative aspect-square rounded-2xl overflow-hidden",
          "bg-secondary",
          "transition-all duration-300 ease-out-expo",
          "group-hover:translate-y-[-8px] group-hover:shadow-2xl"
        )}
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* 2x2 Image Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full p-1">
          {images.map((image, idx) => (
            <div
              key={idx}
              className={cn(
                "relative overflow-hidden",
                "transition-transform duration-300 ease-out-expo",
                "group-hover:scale-[1.03]"
              )}
            >
              <img
                src={image}
                alt={`${folder.name} cover ${idx + 1}`}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Hover Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/20",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300"
          )}
        />
      </div>

      {/* Folder Info */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            {folder.name}
          </h3>
          <p className="text-sm text-muted-foreground">{folder.artist}</p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Show folder options menu
          }}
          className={cn(
            "w-8 h-8 rounded-full",
            "flex items-center justify-center",
            "text-muted-foreground hover:text-foreground hover:bg-secondary",
            "transition-all duration-200",
            "opacity-0 group-hover:opacity-100"
          )}
          aria-label="Folder options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
