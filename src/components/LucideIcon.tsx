import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
  strokeWidth?: number;
  [key: string]: any;
}

export default function LucideIcon({ 
  name, 
  size = 16, 
  className = '', 
  color, 
  strokeWidth = 2, 
  ...rest 
}: LucideIconProps) {
  const Component = (LucideIcons as any)[name] || 
    (LucideIcons as any)[name?.charAt(0).toUpperCase() + name?.slice(1)] || 
    LucideIcons.Sparkles;

  if (!Component) {
    return null;
  }

  return <Component size={size} className={className} color={color} strokeWidth={strokeWidth} {...rest} />;
}
