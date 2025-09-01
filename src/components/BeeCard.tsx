import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface BeeCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'elevated' | 'filled' | 'outlined';
  elevation?: '0' | '1' | '2' | '3' | '4' | '5';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

const BeeCard: React.FC<BeeCardProps> = ({
  children,
  className = '',
  variant = 'elevated',
  elevation = '1',
  padding = 'md',
  rounded = 'md',
  onClick,
}) => {
  const baseClasses = 'relative transition-all duration-medium1';
  
  const variantClasses = {
    elevated: classNames(
      'bg-surface-container-low',
      {
        'shadow-elevation-1': elevation === '1',
        'shadow-elevation-2': elevation === '2',
        'shadow-elevation-3': elevation === '3',
        'shadow-elevation-4': elevation === '4',
        'shadow-elevation-5': elevation === '5',
      },
      'hover:shadow-elevation-2'
    ),
    filled: 'bg-surface-container-highest',
    outlined: 'bg-surface border border-outline',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const roundedClasses = {
    none: 'rounded-none',
    xs: 'rounded-extra-small',
    sm: 'rounded-small',
    md: 'rounded-medium',
    lg: 'rounded-large',
    xl: 'rounded-extra-large',
  };
  
  return (
    <div 
      className={classNames(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        roundedClasses[rounded],
        onClick && 'cursor-pointer',
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
      {onClick && (
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
