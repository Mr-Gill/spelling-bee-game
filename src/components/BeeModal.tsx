import React, { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'react-feather';
import BeeButton from './BeeButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
  showFooterDivider?: boolean;
  showHeaderDivider?: boolean;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-full w-full mx-4',
};

const BeeModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  showFooterDivider = true,
  showHeaderDivider = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close on escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);
  
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;
    
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    firstElement.focus();
    
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);
  
  if (typeof document === 'undefined') return null;
  
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={classNames(
              'fixed inset-0 z-50 flex items-center justify-center p-4',
              'bg-black/50 dark:bg-black/70 backdrop-blur-sm',
              overlayClassName
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            {/* Modal */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              className={classNames(
                'relative w-full max-h-[90vh] overflow-y-auto',
                'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg',
                'rounded-2xl shadow-2xl',
                'border border-gray-200 dark:border-gray-700',
                'transform transition-all',
                sizeClasses[size],
                className
              )}
              onClick={(e) => e.stopPropagation()}
              role="document"
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div
                  className={classNames(
                    'sticky top-0 z-10',
                    'px-6 py-4',
                    'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
                    showHeaderDivider && 'border-b border-gray-200 dark:border-gray-700',
                    'flex items-center justify-between',
                    headerClassName
                  )}
                >
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <BeeButton
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="ml-auto -mr-2"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </BeeButton>
                  )}
                </div>
              )}
              
              {/* Body */}
              <div
                className={classNames(
                  'p-6',
                  'overflow-y-auto',
                  bodyClassName
                )}
              >
                {children}
              </div>
              
              {/* Footer */}
              {footer && (
                <div
                  className={classNames(
                    'sticky bottom-0',
                    'px-6 py-4',
                    'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
                    showFooterDivider && 'border-t border-gray-200 dark:border-gray-700',
                    'flex items-center justify-end space-x-3',
                    'rounded-b-2xl'
                  )}
                >
                  {footer}
                </div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Add focus trap for screen readers */}
          <div className="sr-only" aria-live="polite">
            {isOpen ? 'Modal opened' : 'Modal closed'}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Hook for using the modal
export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);
  
  return {
    isOpen,
    open,
    close,
    toggle,
    modalProps: {
      isOpen,
      onClose: close,
    },
  };
};

// Helper function for class names
function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default BeeModal;
