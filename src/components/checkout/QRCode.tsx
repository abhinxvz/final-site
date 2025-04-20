import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodeProps {
  amount: number;
}

export const QRCode: React.FC<QRCodeProps> = ({ amount }) => {
  // Generate a random QR code pattern
  const generateRandomPattern = () => {
    const size = 7;
    const pattern = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        // Add fixed corners for QR code authenticity
        if ((i === 0 || i === size-1) && (j === 0 || j === size-1)) {
          row.push(1);
        } else {
          row.push(Math.random() > 0.5 ? 1 : 0);
        }
      }
      pattern.push(row);
    }
    return pattern;
  };

  const pattern = generateRandomPattern();

  return (
    <div className="bg-white p-6 rounded-lg text-center">
      <div className="mb-4">
        <p className="text-black font-bold text-lg">Scan to Pay</p>
        <p className="text-gray-600">Amount: ₹{amount}</p>
      </div>
      
      <div className="relative w-48 h-48 mx-auto bg-black p-4">
        <div className="grid grid-cols-7 gap-1">
          {pattern.map((row, i) => 
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`aspect-square ${cell ? 'bg-white' : 'bg-black'}`}
              />
            ))
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <QrCode className="w-8 h-8 text-white/20" />
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Scan with any UPI app
      </div>
    </div>
  );
};