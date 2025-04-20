import React from 'react';
import { X, Sparkles, Zap, Flame } from 'lucide-react';
import { MenuFeature } from './MenuFeature';

interface CreativeMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreativeMenu: React.FC<CreativeMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "IT’S A LIFESTYLE, NOT A TREND",
      description: "Altaira isn’t just about what you wear , it’s about who you are. It’s for those who live on the edge, the ones who are always moving forward, never looking back.",
    },
    {
      icon: Zap,
      title: "NO APOLOGIES FOR BEING EXTRA",
      description: "Why settle for mediocre when you can have everything? Altaira is for the bold, the brave, the extra."
    },
    {
      icon: Flame,
      title: "CHAOS FASHION",
      description: "Designed for the chronically online generation"
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 transition-opacity"
      onClick={handleOverlayClick}
    >
      <div className="absolute left-0 top-0 h-full w-80 bg-background p-6 shadow-lg transform transition-transform duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-primary">ALTAIRA VISION</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-card rounded-full transition-colors"
          >
            <X className="text-primary hover:text-primary-dark" />
          </button>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <MenuFeature
              key={index}
              Icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-background-card p-4 rounded-lg">
            <p className="text-text-secondary text-sm italic">
              " DARE TO RISE, DARE TO BE🦖 "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeMenu;