import * as React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };
export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base =
    variant === 'primary'
      ? 'btn-primary'
      : 'inline-flex items-center justify-center rounded-2xl px-5 py-3 font-medium bg-transparent text-neutraldark border border-neutraldark/20 hover:bg-neutraldark/5 transition';
  return <button className={`${base} ${className}`} {...props} />;
}
