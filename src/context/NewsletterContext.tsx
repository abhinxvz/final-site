import React, { createContext, useContext, useState } from 'react';

interface Subscriber {
  email: string;
  joinDate: Date;
  hasReceivedWelcomeOffer: boolean;
}

interface NewsletterContextType {
  subscribers: Subscriber[];
  subscribe: (email: string) => void;
  isSubscribed: (email: string) => boolean;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export function NewsletterProvider({ children }: { children: React.ReactNode }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const subscribe = (email: string) => {
    if (isSubscribed(email)) {
      throw new Error('Email already subscribed');
    }
    
    setSubscribers([...subscribers, {
      email,
      joinDate: new Date(),
      hasReceivedWelcomeOffer: false
    }]);
  };

  const isSubscribed = (email: string) => {
    return subscribers.some(sub => sub.email === email);
  };

  return (
    <NewsletterContext.Provider value={{ subscribers, subscribe, isSubscribed }}>
      {children}
    </NewsletterContext.Provider>
  );
}

export function useNewsletter() {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
}