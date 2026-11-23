import { AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { VisitOption } from '../App';
import { Button } from './Button';
import { Section } from './LayoutPrimitives';

const SERVICE_OPTIONS = [
  'Retouch and maintenance',
  'Fresh locs',
  'Classic temporary locs',
  'Sister locs',
  'Colour',
  'Removal',
  'Makeup, nails, pedicure or braiding',
  'Not sure yet, advise me',
] as const;

const WHATSAPP_NUMBER = '254797624927';

export interface RequestFormValues {
  name: string;
  phone: string;
  service: string;
  preferredDayTime: string;
  isFlexible: boolean;
  area: string;
  notes: string;
  consent: boolean;
}

type FormErrors = Partial<Record<keyof RequestFormValues | 'homeVisit', string>>;

interface RequestSectionProps {
  visitOption: VisitOption;
  onVisitOptionChange: (value: VisitOption) => void;
  homeVisitRequestSignal: number;
}

const INITIAL_VALUES: RequestFormValues = {
  name: '',
  phone: '',
  service: '',
  preferredDayTime: '',
  isFlexible: false,
  area: '',
  notes: '',
  consent: false,
};

export function buildWhatsAppRequestMessage(
  formValues: RequestFormValues,
  visit: VisitOption,
): string {
  const trimmedName = formValues.name.trim();
  const trimmedPhone = formValues.phone.trim();
  const trimmedPreferred = formValues.preferredDayTime.trim();
  const trimmedArea = formValues.area.trim();
  const trimmedNotes = formValues.notes.trim();

  const preferredTimeLine = trimmedPreferred
    ? `${trimmedPreferred}${formValues.isFlexible ? ' (flexible)' : ''}`
    : 'Flexible';

  const homeVisitLine =
    visit === 'Yes, come to me' ? `Yes, ${trimmedArea}` : 'No, at the studio';

  const lines = [
    'Hello Yabanks, I’d like to request an appointment.',
    `Name: ${trimmedName}`,
    `Phone: ${trimmedPhone}`,
    `Service: ${formValues.service}`,
    `Preferred time: ${preferredTimeLine}`,
    `Home visit: ${homeVisitLine}`,
  ];

  if (trimmedNotes) {
    lines.push(`Notes: ${trimmedNotes}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppRequestUrl(
  formValues: RequestFormValues,
  visit: VisitOption,
): string {
  const message = buildWhatsAppRequestMessage(formValues, visit);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function RequestSection({
  visitOption,
  onVisitOptionChange,
  homeVisitRequestSignal,
}: RequestSectionProps) {
  const [values, setValues] = useState<RequestFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [pendingWhatsAppUrl, setPendingWhatsAppUrl] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const serviceSelectRef = useRef<HTMLSelectElement>(null);
  const preferredInputRef = useRef<HTMLInputElement>(null);
  const areaInputRef = useRef<HTMLInputElement>(null);
  const consentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (homeVisitRequestSignal > 0) {
      setErrors((prev) => {
        if (!prev.area) return prev;
        const next = { ...prev };
        delete next.area;
        return next;
      });
    }
  }, [homeVisitRequestSignal]);

  function updateField<K extends keyof RequestFormValues>(
    field: K,
    value: RequestFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setPendingWhatsAppUrl(null);
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate(currentValues: RequestFormValues, currentVisit: VisitOption): FormErrors {
    const nextErrors: FormErrors = {};

    if (!currentValues.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    const digitsOnly = currentValues.phone.replace(/\D/g, '');
    if (!currentValues.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number.';
    } else if (digitsOnly.length < 9) {
      nextErrors.phone = 'Please enter a valid phone number with at least 9 digits.';
    }

    if (!currentValues.service) {
      nextErrors.service = 'Please select a service.';
    }

    if (!currentValues.isFlexible && !currentValues.preferredDayTime.trim()) {
      nextErrors.preferredDayTime =
        "Please enter your preferred day and time, or tick I'm flexible.";
    }

    if (currentVisit === 'Yes, come to me' && !currentValues.area.trim()) {
      nextErrors.area = 'Please enter your area for a home visit.';
    }

    if (!currentValues.consent) {
      nextErrors.consent =
        'Please tick the consent checkbox so we can reply to your request.';
    }

    return nextErrors;
  }

  function focusFirstInvalid(nextErrors: FormErrors) {
    if (nextErrors.name) {
      nameInputRef.current?.focus();
    } else if (nextErrors.phone) {
      phoneInputRef.current?.focus();
    } else if (nextErrors.service) {
      serviceSelectRef.current?.focus();
    } else if (nextErrors.preferredDayTime) {
      preferredInputRef.current?.focus();
    } else if (nextErrors.area) {
      areaInputRef.current?.focus();
    } else if (nextErrors.consent) {
      consentInputRef.current?.focus();
    }
  }

  function handleRequestAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values, visitOption);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstInvalid(nextErrors);
      return;
    }

    setErrors({});
    const whatsappUrl = buildWhatsAppRequestUrl(values, visitOption);
    setPendingWhatsAppUrl(whatsappUrl);

    let inIframe = false;
    try {
      inIframe = window.self !== window.top;
    } catch {
      inIframe = true;
    }

    if (inIframe) {
      const anchor = document.createElement('a');
      anchor.href = whatsappUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      window.location.href = whatsappUrl;
    }

    window.setTimeout(() => {
      setValues(INITIAL_VALUES);
      onVisitOptionChange('No');
    }, 1000);
  }

  const inputBaseClass =
    'w-full min-h-[52px] rounded-[6px] border bg-white px-4 py-3 font-body text-[16px] text-text placeholder:text-muted/80 dark:bg-[#1E1E1E] dark:text-dark-text dark:placeholder:text-dark-muted/80';
  const inputNormalBorder = 'border-[#8D887C] dark:border-[#5B5850]';
  const inputErrorBorder = 'border-[#9F1D1D] dark:border-[#F87171]';
  const errorTextClass =
    'mt-2 flex items-start gap-2 font-body text-[14px] font-semibold leading-snug text-[#9F1D1D] dark:text-[#F87171]';

  return (
    <Section
      id="request-form"
      surface="white"
      ariaLabel="Send a request"
      className="border-t border-line dark:border-dark-line"
    >
      <div className="max-w-[560px]">
        <h2 className="font-heading text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-text dark:text-dark-text sm:text-[36px]">
          Send a request
        </h2>
        <p className="mt-3 font-body text-[16px] leading-[1.6] text-muted dark:text-dark-muted">
          Tell us the service and timing you have in mind, and we will reply to confirm availability.
        </p>

        <form onSubmit={handleRequestAction} noValidate className="mt-8 flex flex-col gap-6">
          {/* Name */}
          <div>
            <label
              htmlFor="request-name"
              className="mb-2 block font-body text-[15px] font-semibold text-text dark:text-dark-text"
            >
              Name
            </label>
            <input
              ref={nameInputRef}
              id="request-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => updateField('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'error-name' : undefined}
              placeholder="Your full name"
              className={`${inputBaseClass} ${errors.name ? inputErrorBorder : inputNormalBorder}`}
            />
            {errors.name && (
              <p id="error-name" role="alert" className={errorTextClass}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="request-phone"
              className="mb-2 block font-body text-[15px] font-semibold text-text dark:text-dark-text"
            >
              Phone
            </label>
            <input
              ref={phoneInputRef}
              id="request-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'error-phone' : undefined}
              placeholder="0712 345 678"
              className={`${inputBaseClass} tabular-nums ${
                errors.phone ? inputErrorBorder : inputNormalBorder
              }`}
            />
            {errors.phone && (
              <p id="error-phone" role="alert" className={errorTextClass}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Service */}
          <div>
            <label
              htmlFor="request-service"
              className="mb-2 block font-body text-[15px] font-semibold text-text dark:text-dark-text"
            >
              Service
            </label>
            <select
              ref={serviceSelectRef}
              id="request-service"
              name="service"
              value={values.service}
              onChange={(e) => updateField('service', e.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? 'error-service' : undefined}
              className={`${inputBaseClass} cursor-pointer ${
                errors.service ? inputErrorBorder : inputNormalBorder
              }`}
            >
              <option value="">Select a service</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id="error-service" role="alert" className={errorTextClass}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.service}</span>
              </p>
            )}
          </div>

          {/* Preferred day and time + I'm flexible */}
          <div>
            <label
              htmlFor="request-preferred-time"
              className="mb-2 block font-body text-[15px] font-semibold text-text dark:text-dark-text"
            >
              Preferred day and time
            </label>
            <input
              ref={preferredInputRef}
              id="request-preferred-time"
              name="preferredDayTime"
              type="text"
              value={values.preferredDayTime}
              onChange={(e) => updateField('preferredDayTime', e.target.value)}
              aria-invalid={Boolean(errors.preferredDayTime)}
              aria-describedby={
                errors.preferredDayTime ? 'error-preferred-time' : undefined
              }
              placeholder="e.g. Saturday at 10:00 am"
              className={`${inputBaseClass} ${
                errors.preferredDayTime ? inputErrorBorder : inputNormalBorder
              }`}
            />

            <label
              htmlFor="request-flexible"
              className="mt-3 inline-flex min-h-[44px] cursor-pointer items-center gap-3 font-body text-[15px] text-text dark:text-dark-text"
            >
              <input
                id="request-flexible"
                name="isFlexible"
                type="checkbox"
                checked={values.isFlexible}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setValues((prev) => ({ ...prev, isFlexible: checked }));
                  if (checked && errors.preferredDayTime) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.preferredDayTime;
                      return next;
                    });
                  }
                }}
                className="h-5 w-5 shrink-0 cursor-pointer rounded-[4px] border border-[#8D887C] accent-ink dark:border-[#5B5850] dark:accent-gold"
              />
              <span>I&apos;m flexible</span>
            </label>

            {errors.preferredDayTime && (
              <p id="error-preferred-time" role="alert" className={errorTextClass}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.preferredDayTime}</span>
              </p>
            )}
          </div>

          {/* Home visit? radio */}
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2 font-body text-[15px] font-semibold text-text dark:text-dark-text">
              Home visit?
            </legend>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <label className="inline-flex min-h-[48px] cursor-pointer items-center gap-3 font-body text-[15px] text-text dark:text-dark-text">
                <input
                  type="radio"
                  name="homeVisit"
                  value="No"
                  checked={visitOption === 'No'}
                  onChange={() => {
                    onVisitOptionChange('No');
                    setErrors((prev) => {
                      if (!prev.area) return prev;
                      const next = { ...prev };
                      delete next.area;
                      return next;
                    });
                  }}
                  className="h-5 w-5 shrink-0 cursor-pointer accent-ink dark:accent-gold"
                />
                <span>No</span>
              </label>

              <label className="inline-flex min-h-[48px] cursor-pointer items-center gap-3 font-body text-[15px] text-text dark:text-dark-text">
                <input
                  type="radio"
                  name="homeVisit"
                  value="Yes, come to me"
                  checked={visitOption === 'Yes, come to me'}
                  onChange={() => onVisitOptionChange('Yes, come to me')}
                  className="h-5 w-5 shrink-0 cursor-pointer accent-ink dark:accent-gold"
                />
                <span>Yes, come to me</span>
              </label>
            </div>
          </fieldset>

          {/* Area (shown only when Yes) */}
          {visitOption === 'Yes, come to me' && (
            <div>
              <label
                htmlFor="request-area"
                className="mb-2 block font-body text-[15px] font-semibold text-text dark:text-dark-text"
              >
                Area
              </label>
              <input
                ref={areaInputRef}
                id="request-area"
                name="area"
                type="text"
                autoComplete="street-address"
                value={values.area}
                onChange={(e) => updateField('area', e.target.value)}
                aria-invalid={Boolean(errors.area)}
                aria-describedby={errors.area ? 'error-area' : undefined}
                placeholder="Neighbourhood or estate in Nairobi"
                className={`${inputBaseClass} ${
                  errors.area ? inputErrorBorder : inputNormalBorder
                }`}
              />
              {errors.area && (
                <p id="error-area" role="alert" className={errorTextClass}>
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{errors.area}</span>
                </p>
              )}
            </div>
          )}

          {/* Notes (optional) */}
          <div>
            <label
              htmlFor="request-notes"
              className="mb-2 block font-body text-[15px] font-semibold text-text dark:text-dark-text"
            >
              Notes (optional)
            </label>
            <textarea
              id="request-notes"
              name="notes"
              rows={4}
              value={values.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Share your hair length, style ideas or questions"
              className={`w-full min-h-[112px] rounded-[6px] border bg-white px-4 py-3 font-body text-[16px] text-text placeholder:text-muted/80 dark:bg-[#1E1E1E] dark:text-dark-text dark:placeholder:text-dark-muted/80 ${inputNormalBorder}`}
            />
          </div>

          {/* Unticked consent checkbox with Privacy notice link */}
          <div>
            <div className="flex items-start gap-3">
              <input
                ref={consentInputRef}
                id="request-consent"
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={(e) => updateField('consent', e.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'error-consent' : undefined}
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded-[4px] border border-[#8D887C] accent-ink dark:border-[#5B5850] dark:accent-gold"
              />
              <label
                htmlFor="request-consent"
                className="cursor-pointer font-body text-[14px] leading-[1.6] text-text dark:text-dark-text"
              >
                I agree that Yabanks may use these details to reply to my request.{' '}
                <a
                  href="#privacy-notice-details"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPrivacyNotice((prev) => !prev);
                  }}
                  aria-expanded={showPrivacyNotice}
                  aria-controls="privacy-notice-details"
                  className="font-semibold text-deep-gold underline underline-offset-4 hover:text-ink dark:text-gold dark:hover:text-dark-text"
                >
                  Privacy notice
                </a>
              </label>
            </div>

            {showPrivacyNotice && (
              <div
                id="privacy-notice-details"
                className="mt-3 rounded-[6px] border border-line bg-paper p-4 font-body text-[14px] leading-[1.6] text-muted dark:border-dark-line dark:bg-[#1E1E1E] dark:text-dark-muted"
              >
                We only use your name, phone number and request details to reply to you about your
                visit or home service. Your details are not stored on a server or shared for
                marketing.
              </div>
            )}

            {errors.consent && (
              <p id="error-consent" role="alert" className={errorTextClass}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.consent}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-3">
            <p className="font-body text-[14px] leading-[1.5] text-muted dark:text-dark-muted">
              This opens WhatsApp with your message ready. Tap send there to complete your request.
            </p>
            <div data-cta-group="primary" className="w-full sm:w-auto">
              <Button
                type="submit"
                variant="primary"
                surface="auto"
                className="w-full sm:w-auto"
              >
                Open WhatsApp to send
              </Button>
            </div>
            {pendingWhatsAppUrl && (
              <p
                role="status"
                aria-live="polite"
                className="font-body text-[14px] leading-[1.5] text-text dark:text-dark-text"
              >
                If WhatsApp did not open,{' '}
                <a
                  href={pendingWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-deep-gold underline underline-offset-4 hover:text-ink dark:text-gold dark:hover:text-dark-text"
                >
                  open your pre-filled WhatsApp message here
                </a>
                .
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}
