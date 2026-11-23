import { MessageCircle } from 'lucide-react';
import { LinkButton } from './Button';
import { Container } from './LayoutPrimitives';

const STUDIO_ADDRESS = 'Fagilia, Utawala, Nairobi, opposite ACK St Monica';
const WHATSAPP_DISPLAY = '0797 624 927';
const WHATSAPP_HREF = 'https://wa.me/254797624927';
const CALL_DISPLAY = '0768 875 601';
const CALL_HREF = 'tel:+254768875601';
const DIRECTIONS_HREF =
  'https://www.google.com/maps/search/?api=1&query=Fagilia+Utawala+Nairobi+ACK+St+Monica';

const OPENING_HOURS = [
  { days: 'Monday to Friday', hours: '8 am to 9 pm' },
  { days: 'Saturday', hours: '7:30 am to 10 pm' },
  { days: 'Sunday', hours: '7:30 am to 9 pm' },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="visit-studio"
      aria-label="Visit the studio"
      className="border-t border-dark-line bg-ink text-dark-text"
    >
      <Container className="py-[56px] md:py-[80px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Address, numbers, and ordered CTAs */}
          <div className="flex flex-col items-start lg:col-span-7">
            <h2 className="font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-dark-text sm:text-[36px]">
              Visit the studio
            </h2>

            <dl className="mt-6 w-full divide-y divide-dark-line border-t border-b border-dark-line">
              <div className="py-4">
                <dt className="font-body text-[13px] font-semibold text-dark-muted">
                  Address
                </dt>
                <dd className="mt-1 font-body text-[16px] leading-[1.5] text-dark-text">
                  {STUDIO_ADDRESS}
                </dd>
              </div>

              <div className="grid grid-cols-1 divide-y divide-dark-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="py-4 sm:pr-6">
                  <dt className="font-body text-[13px] font-semibold text-dark-muted">
                    WhatsApp
                  </dt>
                  <dd className="mt-1 font-body text-[16px] leading-[1.5] tabular-nums">
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-[4px] font-semibold text-gold underline-offset-4 hover:underline"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                  </dd>
                </div>

                <div className="py-4 sm:pl-6">
                  <dt className="font-body text-[13px] font-semibold text-dark-muted">
                    Calls
                  </dt>
                  <dd className="mt-1 font-body text-[16px] leading-[1.5] tabular-nums">
                    <a
                      href={CALL_HREF}
                      className="inline-block rounded-[4px] font-semibold text-gold underline-offset-4 hover:underline"
                    >
                      {CALL_DISPLAY}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div
              data-cta-group="primary"
              className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <LinkButton
                variant="primary"
                surface="dark"
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Message us on WhatsApp</span>
              </LinkButton>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <LinkButton variant="secondary" surface="dark" href={CALL_HREF}>
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

          {/* Right column: Opening-hours table */}
          <div className="lg:col-span-5">
            <div className="rounded-[6px] border border-dark-line bg-dark-surface p-6">
              <h3 className="font-heading text-[22px] font-medium leading-snug text-dark-text">
                Opening hours
              </h3>

              <table className="mt-4 w-full border-collapse text-left font-body text-[15px]">
                <caption className="sr-only">
                  Weekly opening hours for Yabanks Locs &amp; Beauty Studio
                </caption>
                <tbody className="divide-y divide-dark-line border-t border-dark-line">
                  {OPENING_HOURS.map((row) => (
                    <tr key={row.days}>
                      <th
                        scope="row"
                        className="py-3.5 pr-4 font-normal text-dark-muted"
                      >
                        {row.days}
                      </th>
                      <td className="py-3.5 text-right font-semibold tabular-nums whitespace-nowrap text-dark-text">
                        {row.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-dark-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-heading text-[16px] font-bold text-dark-text">
            Yabanks Locs &amp; Beauty Studio
          </p>
          <p className="font-body text-[14px] text-dark-muted">
            &copy; {year} Yabanks Locs &amp; Beauty Studio · Utawala, Nairobi
          </p>
        </div>
      </Container>
    </footer>
  );
}
