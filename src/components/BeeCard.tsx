import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface BeeCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  hoverEffect?: 'none' | 'scale' | 'glow' | 'float';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  onClick?: () => void;
  isInteractive?: boolean;
}

const BeeCard: React.FC<BeeCardProps> = ({
  children,
  className = '',
  variant = 'default',
  hoverEffect = 'none',
  padding = 'md',
  rounded = 'xl',
  onClick,
  isInteractive = false,
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
    elevated: 'bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm',
    outlined: 'bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm',
    filled: 'bg-gradient-to-br from-bee-yellow-50 to-bee-yellow-100 dark:from-gray-800 dark:to-gray-900',
  };
  
  const hoverEffectClasses = {
    none: '',
    scale: 'hover:scale-[1.02]',
    glow: 'hover:shadow-lg hover:shadow-bee-yellow-500/20',
    float: 'hover:-translate-y-1 hover:shadow-md',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };
  
  const roundedClasses = {
    none: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-3xl',
  };
  
  const interactiveClasses = isInteractive ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={classNames(
        baseClasses,
        variantClasses[variant],
        hoverEffectClasses[hoverEffect],
        paddingClasses[padding],
        roundedClasses[rounded],
        interactiveClasses,
        className
      )}
      onClick={onClick}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-bee-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 -ml-16 -mb-16 bg-primary-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover overlay */}
      {isInteractive && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/30 dark:to-gray-700/30 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
};

// Card Header Component
interface BeeCardHeaderProps {
  children: ReactNode;
  className?: string;
  withDivider?: boolean;
}

export const BeeCardHeader: React.FC<BeeCardHeaderProps> = ({
  children,
  className = '',
  withDivider = false,
}) => (
  <div className={classNames(
    'pb-3 mb-3',
    withDivider && 'border-b border-gray-200 dark:border-gray-700',
    className
  )}>
    {children}
  </div>
);

// Card Title Component
interface BeeCardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const BeeCardTitle: React.FC<BeeCardTitleProps> = ({
  children,
  className = '',
  as: Tag = 'h3',
}) => (
  <Tag className={classNames(
    'text-xl font-bold text-gray-900 dark:text-white',
    'bg-gradient-to-r from-bee-yellow-600 to-primary-600 bg-clip-text text-transparent',
    className
  )}>
    {children}
  </Tag>
);

// Card Subtitle Component
interface BeeCardSubtitleProps {
  children: ReactNode;
  className?: string;
}

export const BeeCardSubtitle: React.FC<BeeCardSubtitleProps> = ({
  children,
  className = '',
}) => (
  <p className={classNames(
    'mt-1 text-sm text-gray-500 dark:text-gray-400',
    className
  )}>
    {children}
  </p>
);

// Card Content Component
interface BeeCardContentProps {
  children: ReactNode;
  className?: string;
}

export const BeeCardContent: React.FC<BeeCardContentProps> = ({
  children,
  className = '',
}) => (
  <div className={classNames('py-2', className)}>
    {children}
  </div>
);

// Card Footer Component
interface BeeCardFooterProps {
  children: ReactNode;
  className?: string;
  withDivider?: boolean;
}

export const BeeCardFooter: React.FC<BeeCardFooterProps> = ({
  children,
  className = '',
  withDivider = false,
}) => (
  <div className={classNames(
    'pt-3 mt-3',
    withDivider && 'border-t border-gray-200 dark:border-gray-700',
    className
  )}>
    {children}
  </div>
);

export default BeeCard;
