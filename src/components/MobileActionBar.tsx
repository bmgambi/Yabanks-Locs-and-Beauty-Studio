import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LinkButton } from './Button';

const WHATSAPP_HREF = 'https://wa.me/254797624927';
const CALL_HREF = 'tel:+254768875601';

export function MobileActionBar() {
  const [hasVisibleCtaGroup, setHasVisibleCtaGroup] = useState(true);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-cta-group="primary"]'),
    );

    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') {
      setHasVisibleCtaGroup(false);
      return;
    }

    const visibleElements = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.isConnected) {
            visibleElements.add(entry.target);
          } else {
            visibleElements.delete(entry.target);
          }
        }
        setHasVisibleCtaGroup(visibleElements.size > 0);
      },
      {
        threshold: 0.01,
      },
    );

    const observeAll = () => {
      observer.disconnect();
      visibleElements.clear();
      const currentTargets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-cta-group="primary"]'),
      );
      if (currentTargets.length === 0) {
        setHasVisibleCtaGroup(false);
        return;
      }
      for (const target of currentTargets) {
        observer.observe(target);
      }
    };

    observeAll();

    const mutationObserver =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(() => {
            observeAll();
          })
        : null;

    const observeRoot = document.getElementById('main-content') ?? document.body;
    mutationObserver?.observe(observeRoot, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver?.disconnect();
      observer.disconnect();
    };
  }, []);

  if (hasVisibleCtaGroup) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-dark-line bg-ink px-[20px] pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="mx-auto flex max-w-[1080px] items-center gap-3">
        <LinkButton
          variant="primary"
          surface="dark"
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Message us on WhatsApp</span>
        </LinkButton>

        <LinkButton
          variant="secondary"
          surface="dark"
          href={CALL_HREF}
          className="px-5"
        >
          Call
        </LinkButton>
      </div>
    </div>
  );
}
