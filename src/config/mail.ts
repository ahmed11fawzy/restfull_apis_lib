import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const sendBasicEmail = async (email: string, code: string) => {
    try {
      const info = await transporter.sendMail({
        from: '"Example User" <af6394158@gmail.com>',
        to: email,
        subject: 'reset password',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            We received a request to reset your password. Here is your 6-digit verification code:
          </p>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; margin: 20px 0; border-radius: 5px;">
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 0; color: #333;">
              ${code}
            </p>
          </div>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            This code will expire in 1 hour. If you didn't request this code, you can safely ignore this email.
          </p>
          <p style="font-size: 14px; margin-top: 30px; color: #777; text-align: center;">
            &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      ` // HTML body
      });
  
      console.log('Message sent: %s', info.messageId);
      console.log('Message sent: %s', info.accepted);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };


export const generateResetCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
}