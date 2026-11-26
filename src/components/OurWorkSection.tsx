import { useEffect, useRef, useState } from 'react';
import { Section } from './LayoutPrimitives';

interface WorkSample {
  id: string;
  src: string;
  alt: string;
}

const sampleUrl = (filename: string) =>
  `${import.meta.env.BASE_URL}samples/${filename}`;

const WORK_SAMPLES: WorkSample[] = [
  {
    id: 'retouch-parting',
    src: sampleUrl('retouch-square-parting.svg'),
    alt: 'Freshly retouched medium locs with neat square parting',
  },
  {
    id: 'barrel-updo',
    src: sampleUrl('barrel-roll-updo.svg'),
    alt: 'Sculpted barrel roll updo styled on mature locs',
  },
  {
    id: 'instant-locs',
    src: sampleUrl('instant-locs-ends.svg'),
    alt: 'Fresh artificial instant locs installed with tapered ends',
  },
  {
    id: 'classic-faux',
    src: sampleUrl('classic-faux-locs.svg'),
    alt: 'Long classic temporary faux locs in natural black',
  },
  {
    id: 'sister-micro',
    src: sampleUrl('sister-micro-locs.svg'),
    alt: 'Finely parted micro locs and sister locs with centre part',
  },
  {
    id: 'honey-colour',
    src: sampleUrl('honey-tipped-locs.svg'),
    alt: 'Medium locs with warm honey-gold coloured tips',
  },
];

function WorkSampleCard({ sample }: { sample: WorkSample }) {
  const [hasError, setHasError] = useState(false);
  const [isMobileZoomed, setIsMobileZoomed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || typeof window === 'undefined') {
      return;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    if (reducedMotionQuery.matches) {
      setIsMobileZoomed(false);
      return;
    }

    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      observer?.disconnect();
      observer = null;

      if (!mobileQuery.matches || reducedMotionQuery.matches) {
        setIsMobileZoomed(false);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setIsMobileZoomed(entry.isIntersecting);
          }
        },
        {
          rootMargin: '-12% 0px -12% 0px',
          threshold: 0.35,
        },
      );

      observer.observe(node);
    };

    setupObserver();

    mobileQuery.addEventListener('change', setupObserver);
    reducedMotionQuery.addEventListener('change', setupObserver);

    return () => {
      observer?.disconnect();
      mobileQuery.removeEventListener('change', setupObserver);
      reducedMotionQuery.removeEventListener('change', setupObserver);
    };
  }, []);

  return (
    <figure className="group m-0 flex flex-col gap-2">
      <div
        ref={frameRef}
        className={`aspect-[4/5] w-full overflow-hidden rounded-[6px] border border-line bg-paper transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-[1.02] md:group-hover:border-deep-gold ${
          isMobileZoomed ? 'scale-[1.02] md:scale-100' : 'scale-100'
        }`}
      >
        {hasError ? (
          <div
            role="img"
            aria-label={sample.alt}
            className="flex h-full w-full items-center justify-center p-4 text-center font-body text-[13px] text-muted"
          >
            {sample.alt}
          </div>
        ) : (
          <img
            src={sample.src}
            alt={sample.alt}
            width={400}
            height={500}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`h-full w-full rounded-[6px] object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-[1.08] ${
              isMobileZoomed ? 'scale-[1.07] md:scale-100' : 'scale-100'
            }`}
          />
        )}
      </div>
      <figcaption className="font-body text-[13px] leading-snug text-muted">
        Sample image
      </figcaption>
    </figure>
  );
}

export function OurWorkSection() {
  return (
    <Section
      id="our-work"
      surface="white"
      ariaLabel="Our work"
      className="border-t border-line"
    >
      <div className="max-w-[68ch]">
        <h2 className="font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-text sm:text-[36px]">
          Our work
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {WORK_SAMPLES.map((sample) => (
          <WorkSampleCard key={sample.id} sample={sample} />
        ))}
      </div>
    </Section>
  );
}
