export const WHATSAPP_NUMBER = '254797624927';

export type WhatsAppSource =
  | 'hero'
  | 'action-bar'
  | 'prices'
  | 'gallery'
  | 'home-visit'
  | 'faq'
  | 'visit-us'
  | 'form';

export interface BuildWhatsAppUrlOptions {
  message?: string;
}

// TODO(copy): provisional default WhatsApp message pending founder confirmation.
const DEFAULT_MESSAGE =
  "Hello Yabanks, I'd like to ask about your locs services.";

// TODO(copy): provisional source-specific WhatsApp messages pending founder confirmation.
const SOURCE_MESSAGES: Partial<Record<WhatsAppSource, string>> = {
  prices: "Hello Yabanks, I'd like to ask about a service and its price.",
  gallery:
    "Hello Yabanks, I'd like to ask about a style I saw. I can send a reference photo.",
  'home-visit': "Hello Yabanks, I'd like to ask about a home visit.",
};

function isProductionBuild(): boolean {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.PROD === true;
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'production';
  }
  return false;
}

export function assertValidWhatsAppNumber(number: string = WHATSAPP_NUMBER): void {
  if (!isProductionBuild() && !/^\d{10,15}$/.test(number)) {
    throw new Error(
      `[whatsapp] WHATSAPP_NUMBER must be 10 to 15 digits with no "+", spaces, or dashes. Received: "${number}"`,
    );
  }
}

assertValidWhatsAppNumber(WHATSAPP_NUMBER);

export function buildWhatsAppUrl(
  source: WhatsAppSource,
  options?: BuildWhatsAppUrlOptions,
): string {
  assertValidWhatsAppNumber(WHATSAPP_NUMBER);

  const customMessage = options?.message?.trim();
  const baseMessage =
    customMessage && customMessage.length > 0
      ? customMessage
      : SOURCE_MESSAGES[source] ?? DEFAULT_MESSAGE;

  const fullMessage = `${baseMessage}\n\nRef: ${source}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
}
