import React from 'react';
import { Sparkles, Zap, Flame } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "Crafted with attention to detail and premium materials"
    },
    {
      icon: Zap,
      title: "Fast Shipping",
      description: "Quick delivery to your doorstep worldwide"
    },
    {
      icon: Flame,
      title: "Trending Designs",
      description: "Stay ahead with our latest fashion collections"
    }
  ];

  return (
    <div className="relative py-24">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: 'url("https://i.redd.it/k4tdfzcibgea1.jpg")',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-quantum mb-6 text-white">Why Choose ALTAIRA</h2>
          <p className="text-text-secondary text-lg">
            Experience fashion that combines contemporary design with unmatched quality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;