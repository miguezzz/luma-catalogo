'use client';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
};

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button >
  );
}