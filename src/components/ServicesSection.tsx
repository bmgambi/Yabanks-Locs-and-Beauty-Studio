import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { SERVICE_GROUPS } from '../data/services';
import { LinkButton } from './Button';
import { Section } from './LayoutPrimitives';

const WHATSAPP_HREF = 'https://wa.me/254797624927';

export function ServicesSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    const firstId = SERVICE_GROUPS[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });

  function toggleGroup(id: string) {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <Section id="services" surface="canvas" ariaLabel="Services and prices">
      <div className="max-w-[68ch]">
        <h2 className="font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-text dark:text-dark-text sm:text-[36px]">
          Services and prices
        </h2>
        <p className="mt-3 font-body text-[16px] leading-[1.6] text-muted dark:text-dark-muted">
          All prices are in Kenyan shillings (KSh). Tap a group to open it.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {SERVICE_GROUPS.map((group) => {
          const isOpen = Boolean(openIds[group.id]);
          const panelId = `service-panel-${group.id}`;
          const triggerId = `service-trigger-${group.id}`;

          return (
            <div
              key={group.id}
              className="rounded-[6px] border border-line bg-white dark:border-dark-line dark:bg-[#1E1E1E]"
            >
              <h3 className="m-0">
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(group.id)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 rounded-[6px] px-4 py-3.5 text-left cursor-pointer transition-colors duration-150 hover:bg-paper/60 dark:hover:bg-dark-surface/60 sm:px-6"
                >
                  <span className="font-heading text-[18px] font-medium leading-snug text-text dark:text-dark-text sm:text-[20px]">
                    {group.title}
                  </span>

                  <span className="flex shrink-0 items-center gap-3 text-[13px] font-semibold text-deep-gold dark:text-gold">
                    <span className="tabular-nums">
                      {group.items.length} {group.items.length === 1 ? 'service' : 'services'}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </h3>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="border-t border-line px-4 py-2 dark:border-dark-line sm:px-6"
                >
                  <ul className="m-0 list-none divide-y divide-line/60 p-0 dark:divide-dark-line/60">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-baseline gap-2 py-3.5 text-[15px] leading-[1.45] sm:text-[16px]"
                      >
                        <span className="min-w-0 font-body font-normal text-text dark:text-dark-text">
                          {item.name}
                        </span>
                        <span
                          aria-hidden="true"
                          className="min-w-[16px] flex-1 border-b border-dotted border-[#8D887C]/60 dark:border-dark-muted/40"
                        />
                        <span className="shrink-0 whitespace-nowrap font-body font-bold tabular-nums text-text dark:text-dark-text">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 border-t border-line pt-6 dark:border-dark-line sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-[15px] leading-[1.6] text-muted dark:text-dark-muted sm:text-[16px]">
          Also at the studio: makeup, nails, pedicure and braiding. Ask us for prices.
        </p>

        <div data-cta-group="primary" className="w-full sm:w-auto">
          <LinkButton
            variant="primary"
            surface="auto"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Message us on WhatsApp</span>
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}
