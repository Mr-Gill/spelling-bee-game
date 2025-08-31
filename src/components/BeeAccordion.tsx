import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'react-feather';
import classNames from 'classnames';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  icon?: ReactNode;
  disabled?: boolean;
  initialOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen: isOpenProp,
  onToggle,
  className = '',
  headerClassName = '',
  contentClassName = '',
  icon,
  disabled = false,
  initialOpen = false,
}) => {
  const [isOpenState, setIsOpenState] = useState(initialOpen);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenState;
  const contentRef = useRef<HTMLDivElement>(null);
  
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) {
      setIsOpenState(!isOpen);
    }
    onToggle?.();
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };
  
  return (
    <div 
      className={classNames(
        'border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden',
        'transition-all duration-200',
        isOpen ? 'bg-white/80 dark:bg-gray-800/80' : 'bg-gray-50/50 dark:bg-gray-800/50',
        disabled ? 'opacity-60' : 'hover:shadow-md',
        className
      )}
    >
      <h3>
        <button
          type="button"
          className={classNames(
            'w-full flex items-center justify-between p-4 text-left',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bee-yellow-500',
            'transition-colors duration-200',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            headerClassName
          )}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-disabled={disabled}
        >
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <span className="font-medium text-gray-900 dark:text-white">
              {title}
            </span>
          </div>
          <div className="ml-2 flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </button>
      </h3>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { 
                opacity: 1, 
                height: 'auto',
                transition: { 
                  opacity: { duration: 0.2 },
                  height: { duration: 0.3 }
                }
              },
              collapsed: { 
                opacity: 0, 
                height: 0,
                transition: { 
                  opacity: { duration: 0.1 },
                  height: { duration: 0.2 }
                }
              },
            }}
            className="overflow-hidden"
            aria-hidden={!isOpen}
          >
            <div 
              ref={contentRef}
              className={classNames(
                'p-4 pt-0',
                'text-gray-700 dark:text-gray-300',
                contentClassName
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  defaultOpenItems?: number[];
}

export const Accordion: React.FC<AccordionProps> & { Item: typeof AccordionItem } = ({
  children,
  allowMultiple = false,
  className = '',
  itemClassName = '',
  headerClassName = '',
  contentClassName = '',
  defaultOpenItems = [],
}) => {
  const [openItems, setOpenItems] = useState<number[]>(defaultOpenItems);
  
  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };
  
  return (
    <div className={classNames('space-y-2', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === AccordionItem) {
          return React.cloneElement(child, {
            isOpen: openItems.includes(index),
            onToggle: () => handleToggle(index),
            className: classNames(child.props.className, itemClassName),
            headerClassName: classNames(child.props.headerClassName, headerClassName),
            contentClassName: classNames(child.props.contentClassName, contentClassName),
          });
        }
        return child;
      })}
    </div>
  );
};

// Add Item as a static property to Accordion
Accordion.Item = AccordionItem;

export default Accordion;
