import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          HugZa
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
          Create a heartwarming moment between two people.
        </p>
      </div>
    </header>
  );
};

export default Header;