import { MessageCircle } from 'lucide-react';
import { getNairobiOpenStatus } from '../data/hours';
import { buildWhatsAppUrl } from '../lib/whatsapp';
import { LinkButton } from './Button';
import { Section } from './LayoutPrimitives';

const STUDIO_ADDRESS = 'Fagilia, Utawala, Nairobi, opposite ACK St Monica';
const WHATSAPP_DISPLAY = '0797 624 927';
const HERO_WHATSAPP_HREF = buildWhatsAppUrl('hero');
const VISIT_US_WHATSAPP_HREF = buildWhatsAppUrl('visit-us');
const CALL_DISPLAY = '0768 875 601';
const CALL_HREF = 'tel:+254768875601';
const DIRECTIONS_HREF =
  'https://www.google.com/maps/place/yabanks+locs+%26+beauty+studio/@-1.2833423,36.9682965,17z/data=!3m1!4b1!4m6!3m5!1s0x182f6ca37a8f356f:0x8ea675f2f3b14121!8m2!3d-1.2833477!4d36.9708714!16s%2Fg%2F11pdn519zf';

export function HeroSection() {
  const status = getNairobiOpenStatus();

  return (
    <Section surface="dark" ariaLabel="Studio overview and contact">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
        {/* Left column: Headline, sub-line, and ordered CTAs */}
        <div className="flex flex-col items-start lg:col-span-7">
          <h1 className="font-heading text-[34px] font-bold leading-[1.14] tracking-[-0.015em] text-dark-text sm:text-[44px] lg:text-[52px]">
            Locs installed, maintained and styled in Utawala
          </h1>

          <p className="mt-4 max-w-[52ch] font-body text-[16px] font-normal leading-[1.6] text-dark-muted sm:text-[18px]">
            Prices are listed below. We&apos;re open seven days a week.
          </p>

          <div
            data-cta-group="primary"
            className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <LinkButton
              variant="primary"
              surface="dark"
              href={HERO_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Message us on WhatsApp</span>
            </LinkButton>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <LinkButton
                variant="secondary"
                surface="dark"
                href={CALL_HREF}
              >
                Call
              </LinkButton>

              <LinkButton
                variant="tertiary"
                surface="dark"
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </LinkButton>
            </div>
          </div>
        </div>

        {/* Right column on desktop, stacked under buttons on mobile: Visit us card */}
        <aside
          aria-label="Visit us"
          className="rounded-[6px] border border-dark-line bg-dark-surface p-6 lg:col-span-5"
        >
          <h2 className="font-heading text-[22px] font-medium leading-snug text-dark-text">
            Visit us
          </h2>

          <p
            className="mt-2 font-body text-[14px] font-semibold leading-snug text-gold"
            aria-label={`Studio hours status: ${status.summary}`}
          >
            {status.summary}
          </p>

          <dl className="mt-5 divide-y divide-dark-line border-t border-dark-line">
            <div className="py-3.5">
              <dt className="font-body text-[13px] font-semibold text-dark-muted">
                Address
              </dt>
              <dd className="mt-1 font-body text-[15px] leading-[1.5] text-dark-text">
                {STUDIO_ADDRESS}
              </dd>
            </div>

            <div className="py-3.5">
              <dt className="font-body text-[13px] font-semibold text-dark-muted">
                WhatsApp
              </dt>
              <dd className="mt-1 font-body text-[15px] leading-[1.5] tabular-nums">
                <a
                  href={VISIT_US_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-[4px] font-semibold text-gold underline-offset-4 hover:underline"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </dd>
            </div>

            <div className="pt-3.5">
              <dt className="font-body text-[13px] font-semibold text-dark-muted">
                Calls
              </dt>
              <dd className="mt-1 font-body text-[15px] leading-[1.5] tabular-nums">
                <a
                  href={CALL_HREF}
                  className="inline-block rounded-[4px] font-semibold text-gold underline-offset-4 hover:underline"
                >
                  {CALL_DISPLAY}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
