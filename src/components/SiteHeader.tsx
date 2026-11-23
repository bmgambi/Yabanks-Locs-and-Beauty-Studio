import { Moon, Sun } from 'lucide-react';
import { Container } from './LayoutPrimitives';

interface SiteHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function SiteHeader({ isDark, onToggleTheme }: SiteHeaderProps) {
  return (
    <header className="bg-ink text-dark-text border-b border-dark-line">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-[52px] focus:items-center focus:rounded-[6px] focus:bg-gold focus:px-4 focus:font-semibold focus:text-ink"
      >
        Skip to main content
      </a>

      <Container className="flex min-h-[76px] items-center justify-between gap-4 py-4">
        <a
          href="#top"
          className="group flex flex-col gap-0.5 rounded-[6px] py-1 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <span className="font-heading text-[20px] sm:text-[22px] font-bold leading-tight tracking-[-0.01em] text-dark-text">
            Yabanks Locs &amp; Beauty Studio
          </span>
          <span className="font-body text-[14px] font-normal leading-snug text-gold">
            Utawala, Nairobi
          </span>
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-pressed={isDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[6px] border border-dark-line bg-ink px-4 text-[14px] font-semibold text-dark-text whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {isDark ? (
            <>
              <Sun className="h-4 w-4 text-gold" aria-hidden="true" />
              <span>Light mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 text-gold" aria-hidden="true" />
              <span>Dark mode</span>
            </>
          )}
        </button>
      </Container>
    </header>
  );
}
