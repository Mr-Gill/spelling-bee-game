import React, { Children, ReactElement, ReactNode, cloneElement, useState } from 'react';
import classNames from 'classnames';

interface TabProps {
  children: ReactNode;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

interface TabsProps {
  children: ReactElement<TabProps>[];
  defaultActiveIndex?: number;
  onChange?: (index: number) => void;
  variant?: 'default' | 'pills' | 'underline' | 'segmented';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  tabListClassName?: string;
  tabPanelClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}

const tabSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const tabVariants = {
  default: {
    active: 'border-bee-yellow-500 text-bee-yellow-600 dark:text-bee-yellow-400',
    inactive: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
    border: 'border-b-2',
  },
  pills: {
    active: 'bg-bee-yellow-500 text-white',
    inactive: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
    border: 'rounded-full',
  },
  underline: {
    active: 'border-b-2 border-bee-yellow-500 text-bee-yellow-600 dark:text-bee-yellow-400',
    inactive: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
    border: 'border-b',
  },
  segmented: {
    active: 'bg-white dark:bg-gray-800 text-bee-yellow-600 dark:text-bee-yellow-400 shadow-sm',
    inactive: 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
    border: 'border border-gray-200 dark:border-gray-600 rounded-lg',
  },
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultActiveIndex = 0,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
  tabListClassName = '',
  tabPanelClassName = '',
  activeTabClassName = '',
  tabClassName = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const validChildren = Children.toArray(children).filter((child) =>
    React.isValidElement(child) && (child.type as any).displayName === 'Tab'
  ) as ReactElement<TabProps>[];

  const handleTabClick = (index: number, disabled?: boolean) => {
    if (disabled) return;
    setActiveIndex(index);
    onChange?.(index);
  };

  const variantStyles = tabVariants[variant];
  const sizeClass = tabSizes[size];

  return (
    <div className={classNames('w-full', className)}>
      <div
        className={classNames(
          'flex',
          variant === 'segmented' && 'p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
          variant === 'default' && 'border-b border-gray-200 dark:border-gray-700',
          fullWidth ? 'w-full' : 'w-auto',
          tabListClassName
        )}
        role="tablist"
      >
        {validChildren.map((child, index) => {
          const isActive = index === activeIndex;
          const isDisabled = child.props.disabled;

          return (
            <button
              key={index}
              className={classNames(
                'flex items-center justify-center font-medium transition-colors duration-200 whitespace-nowrap',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bee-yellow-500',
                sizeClass,
                variantStyles.border,
                isActive
                  ? `${variantStyles.active} ${activeTabClassName}`
                  : variantStyles.inactive,
                isDisabled && 'opacity-50 cursor-not-allowed',
                fullWidth ? 'flex-1' : 'px-4',
                tabClassName
              )}
              onClick={() => handleTabClick(index, isDisabled)}
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
            >
              {child.props.icon && (
                <span className="mr-2">{child.props.icon}</span>
              )}
              {child.props.label}
            </button>
          );
        })}
      </div>
      <div 
        className={classNames('mt-4', tabPanelClassName)}
        role="tabpanel"
        aria-labelledby={`tab-${activeIndex}`}
      >
        {validChildren[activeIndex]?.props.children}
      </div>
    </div>
  );
};

// Add display names for better debugging
Tab.displayName = 'Tab';
Tabs.displayName = 'Tabs';

export default Tabs;
