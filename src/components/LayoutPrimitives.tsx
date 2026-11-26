import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1080px] px-[20px] ${className}`}>
      {children}
    </div>
  );
}

type SectionSurface = 'canvas' | 'white' | 'dark';

interface SectionProps {
  id?: string;
  children: ReactNode;
  surface?: SectionSurface;
  className?: string;
  ariaLabel?: string;
}

const surfaceClasses: Record<SectionSurface, string> = {
  canvas: 'bg-paper text-text',
  white: 'bg-white text-text',
  dark: 'bg-ink text-dark-text',
};

export function Section({
  id,
  children,
  surface = 'canvas',
  className = '',
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-[56px] md:py-[80px] ${surfaceClasses[surface]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Hairline({
  surface = 'light',
  className = '',
}: {
  surface?: 'light' | 'dark';
  className?: string;
}) {
  const borderClass = surface === 'dark' ? 'border-dark-line' : 'border-line';
  return <hr className={`border-0 border-t ${borderClass} ${className}`} />;
}
