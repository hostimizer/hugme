import React, { useState } from 'react';
import type { ImageData } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUpload from './components/ImageUpload';
import Button from './components/Button';
import Spinner from './components/Spinner';
import StyleSelector from './components/StyleSelector';
import BackgroundSelector from './components/BackgroundSelector';
import AspectRatioSelector from './components/AspectRatioSelector';
import { generateHugImage } from './services/geminiService';

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const App: React.FC = () => {
  const [personOneImage, setPersonOneImage] = useState<ImageData | null>(null);
  const [personTwoImage, setPersonTwoImage] = useState<ImageData | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [style, setStyle] = useState<string>('photorealistic');
  const [background, setBackground] = useState<string>('smooth white');
  const [aspectRatio, setAspectRatio] = useState<string>('square');

  const handleGenerate = async () => {
    if (!personOneImage || !personTwoImage) {
      setError('Please upload a photo for both people.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultBase64 = await generateHugImage(personOneImage, personTwoImage, style, background, aspectRatio);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `hugza-moment-${style}-${background.replace(' ', '_')}-${aspectRatio}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
            <ImageUpload title="First Person's Photo" onImageUpload={setPersonOneImage} />
            <ImageUpload title="Second Person's Photo" onImageUpload={setPersonTwoImage} />
          </div>

          <div className="space-y-8">
            <StyleSelector selectedStyle={style} onStyleChange={setStyle} />
            <BackgroundSelector selectedBackground={background} onBackgroundChange={setBackground} />
            <AspectRatioSelector selectedAspectRatio={aspectRatio} onAspectRatioChange={setAspectRatio} />
          </div>


          <div className="text-center my-8">
            <Button
              onClick={handleGenerate}
              disabled={!personOneImage || !personTwoImage || isLoading}
              isLoading={isLoading}
            >
              {isLoading ? 'Creating Magic...' : 'Generate Hug'}
            </Button>
          </div>

          {error && (
            <div className="text-center p-4 my-4 text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-300 rounded-lg">
              <p><strong>Oops!</strong> {error}</p>
            </div>
          )}

          <div className="mt-8">
            {isLoading && <Spinner message="The AI is creating your special moment. This can take a moment..." />}
            {generatedImage && (
              <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  Your HugZa Moment
                </h2>
                <div className="relative group max-w-2xl mx-auto rounded-lg shadow-xl overflow-hidden">
                    <img src={generatedImage} alt="Generated hug moment" className="w-full h-auto object-contain" />
                </div>
                <button
                    onClick={handleDownload}
                    className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                >
                    <DownloadIcon />
                    Download Image
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;