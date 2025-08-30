import React from 'react';

export function applyAccessibilitySettings(fontOverride?: string, sizeOverride?: number) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const font = fontOverride || localStorage.getItem('appFont') || 'system-ui';
  const size = sizeOverride !== undefined ? sizeOverride : parseInt(localStorage.getItem('appFontSize') || '16', 10);
  root.style.setProperty('--app-font', font);
  root.style.setProperty('--app-font-size', `${size}px`);
}

interface AccessibilitySettingsProps {
  onClose?: () => void;
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ onClose }) => {
  const [font, setFont] = React.useState<string>(localStorage.getItem('appFont') || 'system-ui');
  const [size, setSize] = React.useState<number>(
    parseInt(localStorage.getItem('appFontSize') || '16', 10)
  );

  React.useEffect(() => {
    applyAccessibilitySettings(font, size);
    localStorage.setItem('appFont', font);
    localStorage.setItem('appFontSize', String(size));
  }, [font, size]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-gray-800">
      <h3 className="text-xl font-bold mb-4 text-center">Accessibility Settings</h3>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Font</label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="system-ui">Default</option>
          <option value="'OpenDyslexic', system-ui">OpenDyslexic</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Font Size: {size}px</label>
        <input
          type="range"
          min={14}
          max={32}
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="text-center">
        <button
          onClick={onClose}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AccessibilitySettings;

