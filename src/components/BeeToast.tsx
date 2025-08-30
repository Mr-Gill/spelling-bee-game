import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'react-feather';

interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onDismiss?: (id: string) => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
} as const;

const typeStyles = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
    icon: 'text-green-500',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    icon: 'text-red-500',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-800 dark:text-amber-200',
    icon: 'text-amber-500',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
    icon: 'text-blue-500',
  },
} as const;

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
} as const;

const BeeToast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'info',
  duration = 5000,
  onDismiss,
  position = 'bottom-right',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = iconMap[type];
  const styles = typeStyles[type];
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.(id);
    }, 300); // Wait for exit animation to complete
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position.includes('bottom') ? 20 : -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position.includes('bottom') ? 20 : -20, scale: 0.95 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
          }}
          className={classNames(
            'fixed z-50 max-w-sm w-full sm:w-96 p-4 rounded-xl shadow-lg',
            'backdrop-blur-sm',
            styles.bg,
            styles.border,
            positionClasses[position],
            'transform transition-all duration-300',
            className
          )}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start">
            <div className={classNames('flex-shrink-0 pt-0.5', styles.icon)}>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className={classNames('text-sm font-medium', styles.text)}>
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bee-yellow-500 rounded-md"
                onClick={handleDismiss}
                aria-label="Dismiss"
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: ToastProps[];
  onDismiss: (id: string) => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'bottom-right',
  className = '',
}) => {
  return (
    <div className={classNames('fixed z-50 space-y-2', positionClasses[position], className)}>
      {toasts.map((toast) => (
        <BeeToast
          key={toast.id}
          {...toast}
          position={position}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

// Toast Hook
type ToastOptions = Omit<ToastProps, 'id' | 'message'>;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  const showToast = (message: string, options: ToastOptions = {}) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, ...options };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    return id;
  };
  
  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  
  const dismissAllToasts = () => {
    setToasts([]);
  };
  
  return {
    toasts,
    showToast,
    dismissToast,
    dismissAllToasts,
    ToastContainer: (props: Omit<ToastContainerProps, 'toasts' | 'onDismiss'>) => (
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        {...props}
      />
    ),
  };
};

// Helper function for class names
function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default BeeToast;
