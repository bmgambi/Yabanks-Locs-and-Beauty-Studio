import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Section } from './LayoutPrimitives';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'retouch-frequency',
    question: 'How often do locs need a retouch?',
    answer:
      'Most locs need a retouch every 1 to 2 months, depending on how fast your hair grows and the size of your locs.',
  },
  {
    id: 'fresh-locs-duration',
    question: 'How long do Fresh locs last?',
    answer:
      'Often 6 months or more with proper care and regular maintenance, depending on the hair used. This is guidance, not a guarantee.',
  },
  {
    id: 'classic-locs-duration',
    question: 'How long do classic temporary locs last?',
    answer:
      'Usually 4 to 8 weeks, and up to about 3 months with careful care. This is guidance, not a guarantee.',
  },
  {
    id: 'how-to-book',
    question: 'How do I book?',
    answer:
      'Message us on WhatsApp, call us, or send a request below. A request is not a confirmed booking until we reply.',
  },
];

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  function toggleQuestion(id: string) {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <Section id="faq" surface="canvas" ariaLabel="Frequently asked questions">
      <div className="max-w-[68ch]">
        <h2 className="font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-text dark:text-dark-text sm:text-[36px]">
          Frequently asked questions
        </h2>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = Boolean(openIds[item.id]);
          const triggerId = `faq-trigger-${item.id}`;
          const panelId = `faq-panel-${item.id}`;

          return (
            <div
              key={item.id}
              className="rounded-[6px] border border-line bg-white dark:border-dark-line dark:bg-[#1E1E1E]"
            >
              <h3 className="m-0">
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleQuestion(item.id)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 rounded-[6px] px-4 py-3.5 text-left cursor-pointer transition-colors duration-150 hover:bg-paper/60 dark:hover:bg-dark-surface/60 sm:px-6"
                >
                  <span className="font-heading text-[18px] font-medium leading-snug text-text dark:text-dark-text sm:text-[20px]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-deep-gold transition-transform duration-150 dark:text-gold ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="border-t border-line px-4 py-4 dark:border-dark-line sm:px-6"
                >
                  <p className="max-w-[68ch] font-body text-[15px] leading-[1.6] text-muted dark:text-dark-muted sm:text-[16px]">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
