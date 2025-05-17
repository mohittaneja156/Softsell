import React, { useState, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
// Import kept for reference of potential API implementation
// import OpenAI from 'openai';

/* OpenAI configuration - kept for reference
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Use with caution! Key exposed in frontend.
});
*/

// System prompt kept for reference of potential AI implementation
const SYSTEM_PROMPT = `You are a helpful customer support agent for SoftSell, a software license marketplace.
Key information:
- We help users buy and sell software licenses securely
- We take 5% commission on successful sales
- We verify all sellers and licenses
- We use escrow for payment protection
- We support major payment methods (credit cards, PayPal, bank transfers)
- 24/7 customer support available at support@softsell.com
Keep responses concise, professional, and friendly. Focus on building trust and explaining our security measures.`;

const PREDEFINED_RESPONSES = {
  'How does the license selling process work?': 
    'The selling process is simple: List your license, set a price, and we handle the verification and secure transfer. Once a buyer is found, funds go into escrow until the license transfer is complete.',
  
  'What security measures do you have in place?': 
    'We implement multiple security layers: seller verification, license authenticity checks, secure payment processing, and escrow protection. All transactions are encrypted and monitored.',
  
  'How are payments processed and secured?': 
    'Payments are processed through our secure payment gateway supporting credit cards, PayPal, and bank transfers. Funds are held in escrow until successful license transfer.',
  
  'What are your commission rates?': 
    'We charge a competitive 5% commission on successful sales. This covers our secure escrow service, license verification, and platform maintenance.',
  
  'How do you verify software licenses?': 
    'Our verification process includes checking license authenticity, ownership validation, and ensuring the license is transferable. We work directly with software vendors when needed.',

  // New responses
  'Do you offer refunds?': 
    'Yes, we offer a 48-hour money-back guarantee if the license transfer fails or if the license is not as described. Refunds are processed through the same payment method used for purchase.',

  'How long does the transfer process take?': 
    `Most license transfers are completed within 24-48 hours. Complex cases involving vendor verification may take up to 72 hours. We'll keep you updated throughout the process.`,

  'What types of software licenses do you support?': 
    'We support perpetual licenses, subscription transfers, and volume licensing for most major software vendors. This includes Adobe, Microsoft, AutoDesk, and many others.',

  'Is my payment information secure?': 
    'Absolutely. We use bank-grade encryption for all transactions and never store your full credit card details. Our payment system is PCI-DSS compliant.',

  'Can I sell multiple licenses?': 
    'Yes, you can list multiple licenses either individually or as a bundle. Volume discounts are available for bulk sales.',

  'What happens if a license transfer fails?': 
    'If a transfer fails, the funds remain in escrow and are immediately returned to the buyer. We\'ll help troubleshoot the issue or find an alternative solution.',

  // Add a default response key
  'default': 'I apologize, but I\'m not sure about that. You can contact our support team at support@softsell.com for more specific assistance.',

  // Alternative responses array
  'alternatives': [
    'I understand your question might be specific. For detailed assistance, you can:\n1. Email us at support@softsell.com\n2. Check our FAQ section\n3. Schedule a call with our support team',
    'While I don\'t have a specific answer for that, I can help you connect with our specialized support team. Would you like their direct contact information?',
    'That\'s a great question. While I don\'t have the exact information, our knowledge base at help.softsell.com might have what you\'re looking for.',
    'I apologize I can\'t answer that specifically. Would you like me to connect you with a human support agent who can better assist you?'
  ]
};

const ChatWidget = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Kept system prompt in messages for future AI implementation
  const [messages, setMessages] = useState([
    { role: 'system', content: SYSTEM_PROMPT },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'How does the license selling process work?',
    'What security measures do you have in place?',
    'Do you offer refunds?',
    'How long does the transfer process take?',
    'What types of software licenses do you support?',
    'Is my payment information secure?'
  ];

  const handleSend = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat history
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInput('');
    setIsLoading(true);

    // Using predefined responses instead of API
    setTimeout(() => {
      let response;
      if (PREDEFINED_RESPONSES[message]) {
        response = PREDEFINED_RESPONSES[message];
      } else {
        // Get random alternative response or use default if alternatives array is empty
        const alternatives = PREDEFINED_RESPONSES.alternatives;
        response = alternatives && alternatives.length > 0
          ? alternatives[Math.floor(Math.random() * alternatives.length)]
          : PREDEFINED_RESPONSES.default;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  // Scroll listener to set opacity on button
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`bg-blue-600 dark:bg-gray-800 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 ${isScrolled ? 'opacity-70 hover:opacity-100' : ''}`}
          aria-label="Open chat"
        >
          <FaComments className="w-6 h-6 md:w-7 md:h-7 animate-pulse" />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90vw] md:w-[380px] h-[80vh] md:h-[550px] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="bg-blue-600 dark:bg-gray-800 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaComments className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Chat Support</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-900">
            {messages.filter(m => m.role !== 'system').map((msg, i) => (
              <div
                key={i}
                className={`${msg.role === 'user' ? 'ml-auto bg-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'} p-3 text-sm md:text-base rounded-xl max-w-[85%] shadow-sm`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl w-fit">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-600 dark:bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-blue-600 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-blue-600 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">AI is typing...</span>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Frequently Asked Questions:</p>
              <div className="space-y-1">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-xs md:text-sm text-blue-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend(input)}
                placeholder="Type your message..."
                className="flex-1 p-3 text-sm border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-600 dark:focus:border-gray-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 dark:bg-gray-800 text-white p-3 rounded-xl hover:bg-blue-700 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[44px]"
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
