import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, X } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export function FeedbackModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setHoverRating(0);
      setFeedbackText('');
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = () => {
    const dateObj = new Date();
    const day = dateObj.getDate();
    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    const dateStr = `${day}${getOrdinal(day)} ${month} ${year}`;
    
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();

    const newFeedback = {
      id: Date.now(),
      title: "Feedback Title",
      rating: rating,
      description: feedbackText,
      date: dateStr,
      time: timeStr
    };

    try {
      const existingFeedbacks = JSON.parse(localStorage.getItem('hintro_feedbacks') || '[]');
      localStorage.setItem('hintro_feedbacks', JSON.stringify([newFeedback, ...existingFeedbacks]));
      
      // Dispatch a custom event to notify other components that feedback has been added
      window.dispatchEvent(new Event('feedback_added'));
    } catch (e) {
      console.error("Error saving feedback", e);
    }

    setIsSubmitted(true);
  };

  const isPositive = rating >= 4;
  const showTextarea = rating > 0;

  const renderStars = () => {
    return (
      <div className="flex items-center justify-center gap-2 my-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform hover:scale-110"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoverRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div 
        className={`${
          isMobile ? 'w-full max-w-sm p-6' : 'w-full max-w-md p-8'
        } bg-white rounded-xl shadow-2xl flex flex-col relative transition-all`}
      >
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center relative">
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-5 ring-8 ring-yellow-50/50">
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              Your input helps us improve Hintro. We appreciate your time and effort to help us grow.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Give Feedback
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Help us improve your experience with Hintro.
              </p>
            </div>

            {renderStars()}

            {showTextarea && (
              <div className="flex flex-col gap-2 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-medium text-gray-700">
                  {isPositive
                    ? 'What did you like the most?'
                    : 'What went wrong with your experience?'}
                </label>
                <textarea
                  className="w-full h-28 p-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 resize-none transition-colors"
                  placeholder={
                    isPositive
                      ? 'Mention any particular features you liked, or areas we could improve.'
                      : 'Specifically state issues, like audio lag or poor transcription, so we can fix them.'
                  }
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors px-2 py-1.5 rounded-md hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className={`h-10 px-6 text-sm font-medium text-white rounded-lg transition-all flex items-center justify-center
                  ${
                    rating > 0
                      ? 'bg-gray-900 hover:bg-black shadow-sm'
                      : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
