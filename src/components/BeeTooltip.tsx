import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  tooltipClassName?: string;
  disabled?: boolean;
  openOnClick?: boolean;
  openOnHover?: boolean;
  offset?: number;
  arrow?: boolean;
  interactive?: boolean;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  'right-start': 'left-full top-0 ml-2',
  'right-end': 'left-full bottom-0 ml-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  'left-start': 'right-full top-0 mr-2',
  'left-end': 'right-full bottom-0 mr-2',
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45',
  'top-start': 'bottom-0 left-2 -translate-y-1/2 rotate-45',
  'top-end': 'bottom-0 right-2 -translate-y-1/2 rotate-45',
  right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45',
  'right-start': 'left-0 top-2 -translate-x-1/2 -rotate-45',
  'right-end': 'left-0 bottom-2 -translate-x-1/2 -rotate-45',
  bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[135deg]',
  'bottom-start': 'top-0 left-2 -translate-y-1/2 rotate-[135deg]',
  'bottom-end': 'top-0 right-2 -translate-y-1/2 rotate-[135deg]',
  left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-[45deg]',
  'left-start': 'right-0 top-2 translate-x-1/2 rotate-[45deg]',
  'left-end': 'right-0 bottom-2 translate-x-1/2 rotate-[45deg]',
};

const BeeTooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 0,
  className = '',
  tooltipClassName = '',
  disabled = false,
  openOnClick = false,
  openOnHover = true,
  offset = 8,
  arrow = true,
  interactive = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);
  
  // Handle click outside
  useEffect(() => {
    if (!openOnClick || !isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closeTooltip();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, openOnClick]);
  
  // Close tooltip when scrolling
  useEffect(() => {
    if (!isOpen) return;
    
    const handleScroll = () => {
      closeTooltip();
    };
    
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);
  
  const openTooltip = () => {
    if (disabled) return;
    
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    
    if (delay > 0) {
      setTimer(setTimeout(() => {
        setIsOpen(true);
      }, delay));
    } else {
      setIsOpen(true);
    }
  };
  
  const closeTooltip = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setIsOpen(false);
  };
  
  const toggleTooltip = () => {
    if (isOpen) {
      closeTooltip();
    } else {
      openTooltip();
    }
  };
  
  // Don't render anything during SSR or if disabled
  if (disabled || !isMounted) {
    return <>{children}</>;
  }
  
  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!tooltipRef.current || !triggerRef.current) return {};
    
    const tooltip = tooltipRef.current;
    const trigger = triggerRef.current;
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    const style: React.CSSProperties = {};
    
    // Position the tooltip
    switch (position) {
      case 'top':
        style.bottom = `${window.innerHeight - triggerRect.top + offset}px`;
        style.left = `${triggerRect.left + (triggerRect.width / 2)}px`;
        style.transform = 'translateX(-50%)';
        break;
      case 'top-start':
        style.bottom = `${window.innerHeight - triggerRect.top + offset}px`;
        style.left = `${triggerRect.left}px`;
        break;
      case 'top-end':
        style.bottom = `${window.innerHeight - triggerRect.top + offset}px`;
        style.right = `${window.innerWidth - triggerRect.right}px`;
        break;
      case 'right':
        style.top = `${triggerRect.top + (triggerRect.height / 2)}px`;
        style.left = `${triggerRect.right + offset}px`;
        style.transform = 'translateY(-50%)';
        break;
      case 'right-start':
        style.top = `${triggerRect.top}px`;
        style.left = `${triggerRect.right + offset}px`;
        break;
      case 'right-end':
        style.bottom = `${window.innerHeight - triggerRect.bottom}px`;
        style.left = `${triggerRect.right + offset}px`;
        break;
      case 'bottom':
        style.top = `${triggerRect.bottom + offset}px`;
        style.left = `${triggerRect.left + (triggerRect.width / 2)}px`;
        style.transform = 'translateX(-50%)';
        break;
      case 'bottom-start':
        style.top = `${triggerRect.bottom + offset}px`;
        style.left = `${triggerRect.left}px`;
        break;
      case 'bottom-end':
        style.top = `${triggerRect.bottom + offset}px`;
        style.right = `${window.innerWidth - triggerRect.right}px`;
        break;
      case 'left':
        style.top = `${triggerRect.top + (triggerRect.height / 2)}px`;
        style.right = `${window.innerWidth - triggerRect.left + offset}px`;
        style.transform = 'translateY(-50%)';
        break;
      case 'left-start':
        style.top = `${triggerRect.top}px`;
        style.right = `${window.innerWidth - triggerRect.left + offset}px`;
        break;
      case 'left-end':
        style.bottom = `${window.innerHeight - triggerRect.bottom}px`;
        style.right = `${window.innerWidth - triggerRect.left + offset}px`;
        break;
    }
    
    // Ensure tooltip stays within viewport
    if (style.left !== undefined) {
      style.left = Math.max(offset, Math.min(style.left, window.innerWidth - tooltipRect.width - offset));
    }
    
    if (style.right !== undefined) {
      style.right = Math.max(offset, Math.min(style.right, window.innerWidth - tooltipRect.width - offset));
    }
    
    if (style.top !== undefined) {
      style.top = Math.max(offset, Math.min(style.top, window.innerHeight - tooltipRect.height - offset));
    }
    
    if (style.bottom !== undefined) {
      style.bottom = Math.max(offset, Math.min(style.bottom, window.innerHeight - tooltipRect.height - offset));
    }
    
    return style;
  };
  
  // Event handlers
  const eventHandlers: Record<string, any> = {};
  
  if (openOnHover) {
    eventHandlers.onMouseEnter = openTooltip;
    eventHandlers.onMouseLeave = closeTooltip;
    eventHandlers.onFocus = openTooltip;
    eventHandlers.onBlur = closeTooltip;
  }
  
  if (openOnClick) {
    eventHandlers.onClick = toggleTooltip;
  }
  
  return (
    <div 
      className={classNames('inline-flex', className)}
      ref={triggerRef}
      {...eventHandlers}
    >
      {children}
      
      <AnimatePresence>
        {isOpen && (
          <div 
            ref={tooltipRef}
            className="fixed z-50 pointer-events-none"
            style={getTooltipStyle()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              className={classNames(
                'bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium',
                'px-3 py-1.5 rounded-lg shadow-lg',
                'max-w-xs',
                tooltipClassName
              )}
              role="tooltip"
            >
              {content}
              {arrow && (
                <div 
                  className={classNames(
                    'absolute w-2 h-2 bg-gray-900 dark:bg-gray-800',
                    'shadow-[2px_2px_2px_rgba(0,0,0,0.1)]',
                    arrowClasses[position]
                  )}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeeTooltip;
