import { ArrowLeft, Link2, MoreHorizontal } from 'lucide-react';
import type { SectionType } from '@/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
  section: SectionType;
  onSectionChange: (section: SectionType) => void;
  onBack?: () => void;
  pageTitle: string;
  showBack?: boolean;
}

export function Header({ 
  section, 
  onSectionChange, 
  onBack, 
  pageTitle,
  showBack = false 
}: HeaderProps) {
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16",
        "flex items-center justify-between",
        "px-4 sm:px-6 lg:px-8",
        "transition-all duration-300 ease-out-expo",
        "bg-background/80 backdrop-blur-xl"
      )}
    >
      {/* Left Section - Back & Title */}
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={onBack}
            className={cn(
              "w-10 h-10 rounded-full",
              "flex items-center justify-center",
              "bg-secondary/80 text-foreground",
              "hover:bg-secondary hover:scale-105",
              "transition-all duration-200 ease-out-expo",
              "animate-fade-in-up"
            )}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : null}
        
        <div className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {/* Section Toggle */}
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => onSectionChange('music')}
              className={cn(
                "px-2 py-1 rounded-md font-medium transition-all duration-200",
                section === 'music' 
                  ? "text-foreground bg-secondary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              [u]
            </button>
            <span className="text-muted-foreground">/</span>
            <button
              onClick={() => onSectionChange('sfx')}
              className={cn(
                "px-2 py-1 rounded-md font-medium transition-all duration-200",
                section === 'sfx' 
                  ? "text-foreground bg-secondary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              [s]
            </button>
          </div>
          
          {/* Page Title */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              {pageTitle}
            </h1>
            <span className="text-xs text-muted-foreground">justbenzo</span>
          </div>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div 
        className="flex items-center gap-2 animate-fade-in-up"
        style={{ animationDelay: '200ms' }}
      >
        <button
          className={cn(
            "w-10 h-10 rounded-full",
            "flex items-center justify-center",
            "bg-secondary/80 text-foreground",
            "hover:bg-secondary hover:scale-105",
            "transition-all duration-200 ease-out-expo"
          )}
          aria-label="Copy link"
        >
          <Link2 className="w-5 h-5" />
        </button>
        
        <button
          className={cn(
            "w-10 h-10 rounded-full",
            "flex items-center justify-center",
            "bg-secondary/80 text-foreground",
            "hover:bg-secondary hover:scale-105",
            "transition-all duration-200 ease-out-expo"
          )}
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
