import React, { useState } from 'react';

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerFormProps {
  onSubmit: (details: CustomerDetails) => void;
  onCancel: () => void;
  total: number;
  isProcessing: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel, total, isProcessing }) => {
  const [details, setDetails] = useState<CustomerDetails>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Receiver's Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className="input-field text-white"
                placeholder="Enter your name"
                disabled={isProcessing}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                className="input-field text-white"
                placeholder="Enter your email"
                disabled={isProcessing}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={details.phone}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                className="input-field text-white"
                placeholder="Enter your phone number"
                disabled={isProcessing}
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-text-secondary mb-1">
                Shipping Address
              </label>
              <textarea
                id="address"
                required
                value={details.address}
                onChange={(e) => setDetails({ ...details, address: e.target.value })}
                className="input-field text-white"
                rows={3}
                placeholder="Enter your shipping address"
                disabled={isProcessing}
              />
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="text-text-secondary">
                Total Amount: <span className="text-primary font-bold">₹{total}</span>
              </div>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-text-secondary hover:text-white transition-colors"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Pay'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;