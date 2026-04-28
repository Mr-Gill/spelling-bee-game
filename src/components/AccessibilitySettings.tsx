import React from 'react';

export type AccessibilityFont = 'default' | 'readable' | 'dyslexic';

export interface AccessibilitySettingsState {
  font: AccessibilityFont;
  textScale: number;
  reduceMotion: boolean;
}

const STORAGE_KEY = 'accessibilitySettings';

const defaultSettings: AccessibilitySettingsState = {
  font: 'default',
  textScale: 1,
  reduceMotion: false,
};

const fontFamilies: Record<AccessibilityFont, string> = {
  default: '',
  readable: '"All Inclusive Sans", Arial, sans-serif',
  dyslexic: 'Verdana, Arial, sans-serif',
};

const fontOptions: Array<{ value: AccessibilityFont; label: string; description: string }> = [
  { value: 'default', label: 'Default', description: 'Use the game font.' },
  { value: 'readable', label: 'Readable', description: 'A clear classroom-friendly font.' },
  { value: 'dyslexic', label: 'Dyslexic friendly', description: 'Wider letter shapes with familiar spacing.' },
];

const textScaleOptions = [
  { value: 1, label: '100%' },
  { value: 1.1, label: '110%' },
  { value: 1.25, label: '125%' },
  { value: 1.4, label: '140%' },
];

const readSettings = (): AccessibilitySettingsState => {
  if (typeof window === 'undefined') return defaultSettings;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw) as Partial<AccessibilitySettingsState>;
    return {
      font: parsed.font && parsed.font in fontFamilies ? parsed.font : defaultSettings.font,
      textScale: typeof parsed.textScale === 'number' ? parsed.textScale : defaultSettings.textScale,
      reduceMotion: Boolean(parsed.reduceMotion),
    };
  } catch {
    return defaultSettings;
  }
};

export const applyAccessibilitySettings = (settings: AccessibilitySettingsState = readSettings()) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const body = document.body;
  const fontFamily = fontFamilies[settings.font];

  root.style.setProperty('--accessibility-font-scale', String(settings.textScale));
  if (fontFamily) {
    root.style.setProperty('--accessibility-font-family', fontFamily);
  } else {
    root.style.removeProperty('--accessibility-font-family');
  }

  root.dataset.reduceMotion = settings.reduceMotion ? 'true' : 'false';
  body.dataset.accessibilityFont = settings.font;
};

interface AccessibilitySettingsProps {
  onClose: () => void;
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ onClose }) => {
  const [settings, setSettings] = React.useState<AccessibilitySettingsState>(() => readSettings());

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applyAccessibilitySettings(settings);
  }, [settings]);

  const updateSettings = (next: Partial<AccessibilitySettingsState>) => {
    setSettings(current => ({ ...current, ...next }));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div
        className="w-full max-w-xl rounded-2xl bg-white p-6 text-gray-900 shadow-2xl dark:bg-gray-900 dark:text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-settings-title"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="accessibility-settings-title" className="text-2xl font-black text-gray-900 dark:text-white">
              Accessibility Settings
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              These settings are saved on this device.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-3 py-2 font-bold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            aria-label="Close accessibility settings"
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Font</h3>
            <div className="grid gap-3">
              {fontOptions.map(option => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:bg-yellow-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <input
                    type="radio"
                    name="accessibility-font"
                    value={option.value}
                    checked={settings.font === option.value}
                    onChange={() => updateSettings({ font: option.value })}
                    className="mt-1 h-5 w-5"
                  />
                  <span>
                    <span className="block font-bold text-gray-900 dark:text-white">{option.label}</span>
                    <span className="block text-sm text-gray-600 dark:text-gray-300">{option.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Text Size</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {textScaleOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateSettings({ textScale: option.value })}
                  className={`rounded-xl border px-4 py-3 font-black transition ${
                    settings.textScale === option.value
                      ? 'border-yellow-500 bg-yellow-300 text-black'
                      : 'border-gray-200 bg-white text-gray-900 hover:bg-yellow-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <span>
              <span className="block font-bold text-gray-900 dark:text-white">Reduce Motion</span>
              <span className="block text-sm text-gray-600 dark:text-gray-300">Minimise animated effects.</span>
            </span>
            <input
              type="checkbox"
              checked={settings.reduceMotion}
              onChange={event => updateSettings({ reduceMotion: event.target.checked })}
              className="h-6 w-6"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
