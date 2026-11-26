import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type SurfaceContext = 'auto' | 'light' | 'dark';

interface BaseProps {
  variant?: ButtonVariant;
  surface?: SurfaceContext;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

function getVariantClasses(variant: ButtonVariant, surface: SurfaceContext): string {
  const base =
    'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[6px] font-semibold text-[16px] leading-none whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50 disabled:cursor-not-allowed';

  if (variant === 'primary') {
    if (surface === 'dark') {
      return `${base} bg-gold text-ink px-6 hover:bg-[#D5B263] active:bg-[#BA9440]`;
    }
    if (surface === 'light') {
      return `${base} bg-ink text-white px-6 hover:bg-[#262522] active:bg-[#000000]`;
    }
    return `${base} bg-ink text-white hover:bg-[#262522] px-6`;
  }

  if (variant === 'secondary') {
    if (surface === 'dark') {
      return `${base} border border-[#5B5850] text-dark-text bg-transparent px-6 hover:border-gold hover:text-gold`;
    }
    if (surface === 'light') {
      return `${base} border border-[#8D887C] text-text bg-transparent px-6 hover:border-ink`;
    }
    return `${base} border border-[#8D887C] text-text bg-transparent px-6 hover:border-ink`;
  }

  // Tertiary text link
  if (surface === 'dark') {
    return `${base} px-2 text-gold underline-offset-4 hover:underline`;
  }
  if (surface === 'light') {
    return `${base} px-2 text-deep-gold underline-offset-4 hover:underline`;
  }
  return `${base} px-2 text-deep-gold underline-offset-4 hover:underline`;
}

export function Button({
  variant = 'primary',
  surface = 'auto',
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${getVariantClasses(variant, surface)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = 'tertiary',
  surface = 'auto',
  className = '',
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={`${getVariantClasses(variant, surface)} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
