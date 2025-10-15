import React, { useState, useRef, useCallback } from 'react';
import type { ImageData } from '../types';
import { fileToBase64 } from '../utils/imageUtils';

interface ImageUploadProps {
  title: string;
  onImageUpload: (imageData: ImageData | null) => void;
}

const CloudUploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

const ImageUpload: React.FC<ImageUploadProps> = ({ title, onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        onImageUpload({ base64, mimeType: file.type });
        setPreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error converting file to base64", error);
        alert('There was an error processing your image.');
      }
    }
  }, [onImageUpload]);

  const handleClear = useCallback(() => {
    setPreview(null);
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onImageUpload]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      <div 
        onClick={handleClick}
        className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 transition-colors duration-300"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="text-center">
            <CloudUploadIcon />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Click to upload an image</p>
          </div>
        )}
      </div>
      {preview && (
        <button
          onClick={handleClear}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
