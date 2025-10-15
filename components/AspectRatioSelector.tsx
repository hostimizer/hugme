import React from 'react';

const ratios = [
  { id: 'square', name: 'Square (1:1)' },
  { id: 'landscape', name: 'Landscape (16:9)' },
  { id: 'portrait', name: 'Portrait (9:16)' },
];

interface AspectRatioSelectorProps {
  selectedAspectRatio: string;
  onAspectRatioChange: (ratio: string) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedAspectRatio, onAspectRatioChange }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">Choose an Aspect Ratio</h3>
      <div className="flex justify-center flex-wrap gap-4">
        {ratios.map((ratio) => (
          <button
            key={ratio.id}
            onClick={() => onAspectRatioChange(ratio.id)}
            className={`
              px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              ${selectedAspectRatio === ratio.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg ring-2 ring-purple-500'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }
            `}
            aria-pressed={selectedAspectRatio === ratio.id}
          >
            {ratio.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;