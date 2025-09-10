import React, { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BeeButton from './BeeButton';

interface BeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  showCloseButton?: boolean;
  showHeaderDivider?: boolean;
  showFooterDivider?: boolean;
  headerClassName?: string;
  footerClassName?: string;
}

interface CloseIconProps {
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface MotionOverlayProps extends React.ComponentProps<typeof motion.div> {
  overlayClassName?: string;
  onClick?: () => void;
}

const MotionOverlay: React.FC<MotionOverlayProps> = ({ 
  overlayClassName = '', 
  onClick, 
  ...props 
}) => (
  <div className={classNames(
    'fixed inset-0 z-50 flex items-center justify-center p-4',
    'bg-black/50 dark:bg-black/70 backdrop-blur-sm',
    overlayClassName
  )}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  </div>
);

type MotionDialogProps = React.ComponentProps<typeof motion.div> & {
  role?: 'dialog' | 'alertdialog' | 'document';
  'aria-modal'?: boolean;
  'aria-labelledby'?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

const MotionDialog: React.FC<MotionDialogProps> = (props) => (
  <motion.div {...props} />
);

const BeeModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = '',
  overlayClassName = '',
  showCloseButton = true,
  showHeaderDivider = true,
  showFooterDivider = true,
  headerClassName = '',
  footerClassName = ''
}: BeeModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close on escape key
  useEffect(() => {
    if (!isOpen || !true) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
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
          <MotionOverlay
            onClick={true ? onClose : undefined}
            overlayClassName={overlayClassName}
          >
            <MotionDialog
              role="dialog"
              aria-modal={true}
              aria-labelledby={title ? 'modal-title' : undefined}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className={classNames(
                'relative w-full max-w-lg bg-surface-container-highest dark:bg-surface-container-high',
                'rounded-xl shadow-elevation-3 overflow-hidden',
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div
                  className={classNames(
                    'sticky top-0 z-10',
                    'px-6 py-4',
                    'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
                    showHeaderDivider ? 'border-b border-gray-200 dark:border-gray-700' : undefined,
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
                      variant="text"
                      size="sm"
                      onClick={onClose}
                      className="ml-auto -mr-2"
                      aria-label="Close modal"
                    >
                      <CloseIcon />
                    </BeeButton>
                  )}
                </div>
              )}
              
              {/* Body */}
              <div
                className={classNames(
                  'p-6',
                  'overflow-y-auto',
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
                    showFooterDivider ? 'border-t border-gray-200 dark:border-gray-700' : undefined,
                    'flex items-center justify-end gap-3',
                    footerClassName
                  )}
                >
                  {footer}
                </div>
              )}
            </MotionDialog>
          </MotionOverlay>
          
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
