import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

const Reviews = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Arjun Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "The quality of ALTAIRA products is unmatched. I've tried many athletic brands, but none compare to the comfort and durability I've experienced with their clothing.",
      date: "15 Aug 2024"
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Delhi",
      rating: 5,
      comment: "Absolutely love my new ALTAIRA gear! The fabric is breathable yet sturdy, perfect for my morning yoga sessions. Will definitely be ordering more soon.",
      date: "03 Sep 2024"
    },
    {
      id: 3,
      name: "Rahul Desai",
      location: "Bangalore",
      rating: 4,
      comment: "Great products that have lasted through intense training sessions. The design is sleek and modern. Would give 5 stars if they had more color options.",
      date: "20 Aug 2024"
    },
    {
      id: 4,
      name: "Neha Kapoor",
      location: "Chennai",
      rating: 5,
      comment: "Phenomenal customer service and even better products. I ordered the wrong size initially, and their team was incredibly helpful with the exchange process.",
      date: "10 Sep 2024"
    },
    {
      id: 5,
      name: "Vikram Singh",
      location: "Hyderabad",
      rating: 5,
      comment: "As a fitness trainer, I need reliable athletic wear, and ALTAIRA delivers. Their clothes maintain their shape and color even after numerous washes.",
      date: "05 Sep 2024"
    },
    {
      id: 6,
      name: "Ananya Reddy",
      location: "Pune",
      rating: 5,
      comment: "The attention to detail in ALTAIRA products is impressive. From stitching to fabric quality, everything speaks premium. Worth every rupee spent!",
      date: "28 Aug 2024"
    },
    {
      id: 7,
      name: "Karan Malhotra",
      location: "Kolkata",
      rating: 4,
      comment: "ALTAIRA's collection has transformed my workout experience. The comfort level is exceptional, though I wish they had more options for winter training gear.",
      date: "12 Sep 2024"
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
      />
    ));
  };

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
          <h2 className="text-4xl font-quantum mb-6 text-white">Customer Reviews</h2>
          <p className="text-text-secondary text-lg">
            Don't just take our word for it - see what our customers have to say about ALTAIRA
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <span className="ml-2 text-text-secondary text-sm">{review.date}</span>
              </div>
              <p className="text-text-secondary mb-4 italic">"{review.comment}"</p>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">{review.name.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">{review.name}</p>
                  <p className="text-text-secondary text-sm">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews; 