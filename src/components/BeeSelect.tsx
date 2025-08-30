import React, { useState, useEffect, useRef, ReactNode, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, ChevronUp } from 'react-feather';
import classNames from 'classnames';

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

interface BeeSelectProps<T> {
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  buttonClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

const sizeClasses = {
  sm: 'py-1.5 pl-3 pr-8 text-sm',
  md: 'py-2 pl-3 pr-10',
  lg: 'py-3 pl-4 pr-12 text-lg',
};

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const BeeSelect = <T extends unknown>({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error,
  disabled = false,
  size = 'md',
  className = '',
  buttonClassName = '',
  optionsClassName = '',
  optionClassName = '',
  leftIcon,
  fullWidth = false,
  required = false,
  name,
  id,
}: BeeSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const selectedOption = options.find((opt) => opt.value === value) || null;
  
  const handleChange = (val: T) => {
    onChange(val);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className={classNames(
      'relative',
      fullWidth ? 'w-full' : 'w-full sm:w-auto',
      className
    )}>
      {label && (
        <label 
          htmlFor={id}
          className={classNames(
            'block mb-1.5 text-sm font-medium',
            error ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
            disabled && 'opacity-60'
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      
      <Listbox 
        value={value} 
        onChange={handleChange}
        disabled={disabled}
      >
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              ref={buttonRef}
              id={id}
              name={name}
              className={classNames(
                'relative w-full text-left',
                'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
                'border-2 rounded-xl',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'transition-all duration-200',
                error 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' 
                  : 'border-gray-300 dark:border-gray-600 focus:border-bee-yellow-500 focus:ring-bee-yellow-500/30',
                disabled && 'opacity-60 cursor-not-allowed',
                sizeClasses[size],
                'pr-10', // Space for the chevron
                leftIcon && 'pl-10', // Space for the left icon
                buttonClassName
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
            >
              {leftIcon && (
                <div className={classNames(
                  'absolute inset-y-0 left-0 flex items-center pl-3',
                  error ? 'text-red-500' : 'text-gray-400',
                  iconSizeClasses[size]
                )}>
                  {leftIcon}
                </div>
              )}
              
              <span className={classNames(
                'block truncate',
                !selectedOption?.value && 'text-gray-500 dark:text-gray-400',
                'text-gray-900 dark:text-white'
              )}>
                {selectedOption?.label || placeholder}
              </span>
              
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                {open ? (
                  <ChevronUp 
                    className={classNames(
                      'text-gray-400',
                      iconSizeClasses[size]
                    )} 
                    aria-hidden="true" 
                  />
                ) : (
                  <ChevronDown 
                    className={classNames(
                      'text-gray-400',
                      iconSizeClasses[size]
                    )} 
                    aria-hidden="true" 
                  />
                )}
              </span>
            </Listbox.Button>
            
            <Transition
              show={isOpen}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options
                static
                className={classNames(
                  'absolute z-10 mt-1 w-full py-1',
                  'bg-white dark:bg-gray-800',
                  'rounded-xl shadow-lg',
                  'ring-1 ring-black/5 dark:ring-white/10',
                  'focus:outline-none',
                  'max-h-60 overflow-auto',
                  'border border-gray-200 dark:border-gray-700',
                  optionsClassName
                )}
              >
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option.value}
                    disabled={option.disabled}
                    className={({ active, selected }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                        active ? 'bg-bee-yellow-100 dark:bg-bee-yellow-900/30' : '',
                        selected ? 'font-medium text-bee-yellow-700 dark:text-bee-yellow-400' : 'text-gray-900 dark:text-gray-100',
                        option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                        optionClassName
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          <div className="flex items-center">
                            {option.icon && (
                              <span className="mr-2">
                                {option.icon}
                              </span>
                            )}
                            {option.label}
                          </div>
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              selected ? 'text-bee-yellow-600 dark:text-bee-yellow-400' : 'text-transparent'
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
      
      {(helperText || error) && (
        <p 
          id={error ? `${id}-error` : undefined}
          className={classNames(
            'mt-1.5 text-sm',
            error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400',
            disabled && 'opacity-60'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default BeeSelect;
