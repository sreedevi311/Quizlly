// src/pages/ContentInputPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { ContentType } from '../../types/content.types';

const ContentInputPage: React.FC = () => {
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const input = {
        text: inputType === 'text' ? content : undefined,
        url: inputType === 'url' ? content : undefined,
        type: inputType === 'text' ? ContentType.TEXT : ContentType.URL,
      };

      const result = await contentService.processContent(input);
      
      console.log('Content processed:', result);
      
      // Navigate to concept review page
      navigate(`/content/${result.contentId}/concepts`);
    } catch (err: any) {
      console.error('Error processing content:', err);
      setError(err.response?.data?.message || 'Failed to process content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Create Your Learning Session
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Provide content and we'll generate personalized questions
          </p>
        </div>
        
        {/* Input Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg inline-flex">
            <button 
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                inputType === 'text' 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setInputType('text')}
            >
              📝 Paste Text
            </button>
            <button 
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                inputType === 'url' 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setInputType('url')}
            >
              🔗 Provide URL
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-pink-100 dark:border-gray-700">
          {inputType === 'text' ? (
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg">
                Educational Content
              </label>
              <textarea
                placeholder="Paste your notes, articles, or study material here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-6 py-4 border-2 border-pink-200 dark:border-gray-600 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-900 transition-all outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-lg"
                required
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg">
                Article or Blog URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/article"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-6 py-4 border-2 border-pink-200 dark:border-gray-600 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-900 transition-all outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-lg"
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-bold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Content...
              </span>
            ) : (
              '✨ Generate Quiz'
            )}
          </button>
        </form>

        {/* Tips Section */}
        <div className="mt-8 bg-pink-50 dark:bg-gray-800 rounded-2xl p-6 border border-pink-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            Pro Tips
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Paste at least 300 words for best results</li>
            <li>• Educational blogs and articles work perfectly</li>
            <li>• The more detailed the content, the better the questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentInputPage;