import * as React from 'react';
export function Card({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`card ${className}`}>{children}</div>;
}
export function CardBody({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`card-body ${className}`}>{children}</div>;
}
