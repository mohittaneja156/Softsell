import React, { useState, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import OpenAI from 'openai';

const openai = new OpenAI({
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are a helpful customer support agent for SoftSell, a software license marketplace.
Key information:
- We help users buy and sell software licenses securely
- We take 5% commission on successful sales
- We verify all sellers and licenses
- We use escrow for payment protection
- We support major payment methods (credit cards, PayPal, bank transfers)
- 24/7 customer support available at support@softsell.com
Keep responses concise, professional, and friendly. Focus on building trust and explaining our security measures.`;

const ChatWidget = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! 👋 How can I help you with software license trading today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'How does the license selling process work?',
    'What security measures do you have in place?',
    'How are payments processed and secured?',
    'What are your commission rates?',
    'How do you verify software licenses?'
  ];

  const handleSend = async (message) => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInput('');
    setIsLoading(true);

    try {
      // Get response from OpenAI
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.filter(msg => msg.role !== 'system'), // Include conversation history
          { role: 'user', content: message }
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content;
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response
      }]);
    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please email support@softsell.com for immediate assistance.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`bg-blue-600 dark:bg-gray-800 text-white p-3 md:p-4 rounded-full 
            shadow-lg hover:bg-blue-700 dark:hover:bg-gray-700 
            transition-all duration-300 hover:scale-105 
            ${isScrolled ? 'opacity-70 hover:opacity-100' : ''}`}
          aria-label="Open chat"
        >
          <FaComments className="w-6 h-6 md:w-7 md:h-7 animate-pulse" />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl 
          w-[90vw] md:w-[380px] h-[80vh] md:h-[550px] 
          flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="bg-blue-600 dark:bg-gray-800 text-white p-4 
            rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaComments className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Chat Support</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 
                transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 
            bg-white dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.role === 'user' 
                    ? 'ml-auto bg-blue-600 text-white' 
                    : 'bg-gray-50 dark:bg-gray-800 text-[var(--color-text)] dark:text-gray-100'
                } p-3 text-sm md:text-base rounded-xl max-w-[85%] shadow-sm`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 
                rounded-xl w-fit">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-600 dark:bg-gray-400 
                    rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-blue-600 dark:bg-gray-400 
                    rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-blue-600 dark:bg-gray-400 
                    rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-sm text-[var(--color-text-secondary)] dark:text-gray-300">
                  AI is typing...
                </span>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 border-t border-[var(--color-border)] dark:border-gray-800 
              bg-white dark:bg-gray-900">
              <p className="text-xs md:text-sm text-[var(--color-text-secondary)] dark:text-gray-300 
                font-medium mb-2">
                Frequently Asked Questions:
              </p>
              <div className="space-y-1">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(question)}
                    className="w-full text-left text-xs md:text-sm text-blue-600 
                      dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 
                      p-2 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-[var(--color-border)] dark:border-gray-800 
            bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Type your message..."
                className="flex-1 p-3 text-sm border border-[var(--color-border)] dark:border-gray-700 
                  rounded-xl focus:outline-none focus:border-blue-600 
                  dark:focus:border-gray-600 focus:ring-2 focus:ring-blue-100 
                  dark:focus:ring-gray-800 bg-white dark:bg-gray-800 
                  text-[var(--color-text)] dark:text-gray-100 placeholder-[var(--color-text-secondary)] 
                  dark:placeholder-gray-400"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 dark:bg-gray-800 text-white p-3 rounded-xl 
                  hover:bg-blue-700 dark:hover:bg-gray-700 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors 
                  flex items-center justify-center min-w-[44px]"
                aria-label="Send message"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;