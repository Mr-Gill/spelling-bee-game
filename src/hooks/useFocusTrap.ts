import { RefObject, useEffect, useRef } from 'react';

export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Get all focusable elements within the container
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // If there's only one focusable element, prevent tabbing out
      if (focusableElements.length === 1) {
        e.preventDefault();
        firstElement.focus();
        return;
      }

      // If going backwards from first element, focus the last one
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // If going forward from last element, focus the first one
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    // Add event listener for tab key
    element.addEventListener('keydown', handleKeyDown);

    // Focus the first element when the component mounts
    if (firstElement) {
      firstElement.focus();
    }

    // Cleanup
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ref;
}
