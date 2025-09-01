import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type NavItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

interface BeeNavProps {
  items: NavItem[];
  activePath: string;
  onNavigate: (path: string) => void;
}

const BeeNav: React.FC<BeeNavProps> = ({ items, activePath, onNavigate }) => {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-low border-t border-outline">
        <div className="flex justify-around p-2">
          {items.map((item) => (
            <motion.div
              key={item.path}
              initial={false}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className={classNames(
                  'flex flex-col items-center p-2 rounded-full',
                  activePath === item.path 
                    ? 'text-primary bg-primary-container'
                    : 'text-on-surface-variant'
                )}
                onClick={() => onNavigate(item.path)}
              >
                <div className="text-2xl">{item.icon}</div>
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-surface-container-low border-r border-outline p-4">
        <div className="space-y-2">
          {items.map((item) => (
            <motion.div
              key={item.path}
              initial={false}
              whileHover={{ backgroundColor: 'var(--md-sys-color-surface-container-high)' }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={classNames(
                  'w-full flex items-center p-3 rounded-lg',
                  activePath === item.path 
                    ? 'text-primary bg-primary-container'
                    : 'text-on-surface-variant'
                )}
                onClick={() => onNavigate(item.path)}
              >
                <div className="text-xl mr-3">{item.icon}</div>
                <span className="text-sm">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default BeeNav;