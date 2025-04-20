import React, { useState } from 'react';
import { Send, Gift } from 'lucide-react';
import { useNewsletter } from '../context/NewsletterContext';
import { sendWelcomeEmail } from '../lib/email';

interface NewsletterProps {
  onSubscribe: (email: string) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { subscribe, isSubscribed } = useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      console.log('Starting subscription process for:', email);

      if (isSubscribed(email)) {
        setError('This email is already subscribed!');
        return;
      }

      console.log('Attempting to send welcome email...');
      const emailSent = await sendWelcomeEmail(email);
      
      if (!emailSent) {
        console.error('Failed to send welcome email');
        throw new Error('Failed to send welcome email. Please try again.');
      }

      console.log('Email sent successfully, subscribing user...');
      subscribe(email);
      onSubscribe(email);
      setSuccess(true);
      setEmail('');
      console.log('Subscription process completed successfully');
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative border-t border-primary/10 py-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: 'url("https://i.redd.it/k4tdfzcibgea1.jpg")',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full backdrop-blur-sm">
            <Gift className="w-4 h-4" />
            <span className="text-sm font-medium">Exclusive Benefits</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Join the ALTAIRA Revolution</h3>
          <p className="text-text-secondary mb-8 text-lg">
            Be the first to experience our latest drops, exclusive offers, and revolutionary designs. 
            Join our community of fashion pioneers and get 15% off your first order!
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-500 text-sm">
                  Welcome to ALTAIRA! Check your email for your exclusive 15% discount code.
                </p>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-grow bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg px-4 py-2 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
                <span className="font-bold">{isLoading ? 'Subscribing...' : 'Subscribe'}</span>
              </button>
            </div>
            <p className="mt-3 text-xs text-text-secondary">
              By subscribing, you agree to receive marketing emails from ALTAIRA. 
              Your data will be handled according to our privacy policy.
            </p>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-background/40 backdrop-blur-sm p-6 rounded-lg">
              <h4 className="text-white font-bold mb-2">Early Access</h4>
              <p className="text-text-secondary text-sm">
                Be the first to shop new collections before they go public
              </p>
            </div>
            <div className="bg-background/40 backdrop-blur-sm p-6 rounded-lg">
              <h4 className="text-white font-bold mb-2">Exclusive Offers</h4>
              <p className="text-text-secondary text-sm">
                Receive special discounts and limited-time deals
              </p>
            </div>
            <div className="bg-background/40 backdrop-blur-sm p-6 rounded-lg">
              <h4 className="text-white font-bold mb-2">VIP Events</h4>
              <p className="text-text-secondary text-sm">
                Get invited to exclusive ALTAIRA community events
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;