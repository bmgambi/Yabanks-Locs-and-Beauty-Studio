import { Button } from './Button';
import { Section } from './LayoutPrimitives';

interface HomeVisitSectionProps {
  onRequestHomeVisit: () => void;
}

export function HomeVisitSection({ onRequestHomeVisit }: HomeVisitSectionProps) {
  return (
    <Section id="home-visits" surface="dark" ariaLabel="Home visits">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="max-w-[60ch]">
          <h2 className="font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-dark-text sm:text-[36px]">
            We can come to you
          </h2>
          <p className="mt-4 font-body text-[16px] leading-[1.6] text-dark-muted">
            Home visits cover Nairobi and surrounding areas, in your own space. You pay the usual
            service price plus a travel cost, which we quote when you request. Please book ahead.
          </p>
        </div>

        <div data-cta-group="primary" className="w-full shrink-0 md:w-auto">
          <Button
            variant="primary"
            surface="dark"
            onClick={onRequestHomeVisit}
            className="w-full md:w-auto"
          >
            Request a home visit
          </Button>
        </div>
      </div>
    </Section>
  );
}
