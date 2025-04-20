import { supabase } from '../supabase';
import { storePaymentIntent, storeOrderId } from './paymentStorage';

export async function redirectToPayPal(amount: number) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Please sign in to complete your purchase');
    }

    // Format amount to 2 decimal places (convert from cents to dollars)
    const formattedAmount = (amount / 100).toFixed(2);
    
    // Generate a unique payment reference
    const paymentRef = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store payment intent with reference
    storePaymentIntent(amount, user.id, paymentRef);
    
    // Construct PayPal URL with reference in note
    const paypalUrl = new URL('https://paypal.me/prowlme');
    paypalUrl.searchParams.set('country.x', 'IN');
    paypalUrl.searchParams.set('locale.x', 'en_GB');
    paypalUrl.pathname = `${paypalUrl.pathname}/${formattedAmount}`;
    
    // Redirect to PayPal
    window.location.href = paypalUrl.toString();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    throw error;
  }
}