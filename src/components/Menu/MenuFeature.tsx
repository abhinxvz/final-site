import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MenuFeatureProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export const MenuFeature: React.FC<MenuFeatureProps> = ({ Icon, title, description }) => {
  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
        <h3 className="text-white font-black text-lg">{title}</h3>
      </div>
      <p className="text-text-secondary ml-9">{description}</p>
    </div>
  );
};