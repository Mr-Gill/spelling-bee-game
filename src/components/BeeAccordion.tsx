import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

interface AccordionItemProps {
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const BeeAccordionItem = ({ header, children, className = '' }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames('border rounded-lg overflow-hidden', className)}>
      <button 
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {header}
        {isOpen ? (
          <CloseIcon />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="p-4">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
