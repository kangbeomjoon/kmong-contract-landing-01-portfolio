import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function MobileContainer({ 
  children, 
  className = '', 
  noPadding = false 
}: MobileContainerProps) {
  const baseClasses = "w-full max-w-sm mx-auto";
  const paddingClasses = noPadding ? "" : "px-4 py-2";
  
  return (
    <div className={`${baseClasses} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
}