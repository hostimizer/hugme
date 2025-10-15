import React from 'react';

const styles = [
  { id: 'photorealistic', name: 'Photorealistic' },
  { id: 'painterly', name: 'Painterly' },
  { id: 'cartoonish', name: 'Cartoonish' },
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">Choose a Style</h3>
      <div className="flex justify-center flex-wrap gap-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`
              px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              ${selectedStyle === style.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg ring-2 ring-purple-500'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }
            `}
            aria-pressed={selectedStyle === style.id}
          >
            {style.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;