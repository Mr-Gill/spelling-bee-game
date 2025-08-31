import { useState, useEffect } from 'react';

type SetValue<T> = (value: T | ((val: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: {
    raw?: boolean;
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
  } = {}
): [T, SetValue<T>] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      
      // Parse stored json or return initialValue if none exists
      if (item === null) {
        return initialValue;
      }

      // If raw, return as is
      if (options.raw) {
        return item as unknown as T;
      }

      // Deserialize if a deserializer is provided
      if (options.deserializer) {
        return options.deserializer(item);
      }

      // Default JSON parse
      return JSON.parse(item);
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue: SetValue<T> = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        const serializedValue = options.serializer 
          ? options.serializer(valueToStore)
          : JSON.stringify(valueToStore);
          
        window.localStorage.setItem(key, serializedValue);
        
        // Notify other hooks of the change
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Sync changes across tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | Event) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    };

    // Listen for changes to this specific key in other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom event triggered by setValue
    window.addEventListener('local-storage', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
