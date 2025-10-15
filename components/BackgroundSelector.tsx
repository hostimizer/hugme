import React from 'react';

const backgrounds = [
  { id: 'smooth white', name: 'Smooth White' },
  { id: 'bokeh', name: 'Bokeh' },
  { id: 'soft gradient', name: 'Soft Gradient' },
  { id: 'blurred nature', name: 'Blurred Nature' },
  { id: 'starry night', name: 'Starry Night' },
  { id: 'cozy fireplace', name: 'Cozy Fireplace' },
];

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ selectedBackground, onBackgroundChange }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">Choose a Background</h3>
      <div className="flex justify-center flex-wrap gap-4">
        {backgrounds.map((background) => (
          <button
            key={background.id}
            onClick={() => onBackgroundChange(background.id)}
            className={`
              px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              ${selectedBackground === background.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg ring-2 ring-purple-500'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }
            `}
            aria-pressed={selectedBackground === background.id}
          >
            {background.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector;