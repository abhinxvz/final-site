import { Resend } from 'resend';

const resend = new Resend('re_bqETqki1_9YvXQM7NRdK7tmsJ8QLWHMRw');

export async function sendWelcomeEmail(email: string) {
  try {
    console.log('Attempting to send welcome email to:', email);
    
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev', // Simplified from address
      to: email,
      subject: 'Welcome to ALTAIRA - Here\'s Your 15% Discount!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ef4444; text-align: center;">Welcome to ALTAIRA!</h1>
          <p>Thank you for joining our community of fashion pioneers!</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h2 style="color: #111111; margin-bottom: 10px;">Your Exclusive Discount Code</h2>
            <div style="background-color: #ef4444; color: white; padding: 10px; border-radius: 4px; font-size: 24px; font-weight: bold;">
              WELCOME15
            </div>
          </div>
          <p>Use this code at checkout to get 15% off your first order.</p>
          <p>Stay tuned for our latest drops and exclusive offers!</p>
          <div style="text-align: center; margin-top: 30px; color: #666;">
            <p>Follow us on social media for more updates:</p>
            <p>Instagram: @altaira_fashion</p>
          </div>
        </div>
      `
    });

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Detailed error sending welcome email:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
}