import nodemailer from 'nodemailer';

// Create a transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true, // Enable debug mode
  logger: true // Enable logging
});

export async function sendNewPostEmail(subscribers: string[], post: any) {
  try {
    console.log('=== Email Sending Debug Information ===');
    console.log('Environment variables:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not Set',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not Set',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ? 'Set' : 'Not Set'
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email credentials are not properly configured in environment variables');
    }

    console.log('Number of subscribers:', subscribers.length);
    console.log('Subscriber emails:', subscribers);
    console.log('Post details:', {
      title: post.title,
      slug: post.slug,
      status: post.status
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: subscribers,
      subject: `🎉 New Post: ${post.title}!` ,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafc; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.07);">
          <div style="background: linear-gradient(90deg, #007bff 0%, #00c6ff 100%); color: #fff; padding: 24px 24px 16px 24px; text-align: center;">
            <div style="font-size: 2.1rem; font-weight: bold; letter-spacing: 2px; margin-bottom: 2px;">INKWELL</div>
            <div style="font-size: 1.1rem; font-weight: 500; letter-spacing: 1px; margin-bottom: 10px;">Your Creative Blogging Destination</div>
            <h1 style="margin: 0; font-size: 1.6rem; letter-spacing: 1px;">🚀 Hot Off the Press!</h1>
            <p style="margin: 8px 0 0 0; font-size: 1.05rem;">You're among the first to know about our latest post 🎊</p>
          </div>
          <div style="padding: 28px 24px 24px 24px;">
            <h2 style="color: #222; margin-top: 0;">${post.title}</h2>
            <p style="color: #444; font-size: 1.1rem; margin-bottom: 18px;">${post.excerpt}</p>
            <div style="margin-bottom: 18px; color: #007bff; font-weight: 500;">⏱️ Reading time: ${post.readingTime} min</div>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/post/${post.slug}"
               style="display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #007bff 0%, #00c6ff 100%); color: #fff; text-decoration: none; border-radius: 6px; font-size: 1.1rem; font-weight: bold; letter-spacing: 1px; box-shadow: 0 2px 8px rgba(0,123,255,0.12); transition: background 0.2s;">
              Read the Exciting Post 🚀
            </a>
            <p style="margin-top: 32px; color: #888; font-size: 0.95rem;">Thank you for being a valued subscriber!<br>Stay tuned for more awesome content.</p>
          </div>
          <div style="background: #f1f3f6; color: #555; text-align: center; padding: 18px 16px 12px 16px; font-size: 0.98rem; border-top: 1px solid #e3e7ee;">
            <div style="font-weight: 500; margin-bottom: 4px;">This email is from <span style="color: #007bff; font-weight: bold;">INKWELL</span> blogging website.</div>
            <div style="font-size: 0.93rem; color: #888;">&copy; ${new Date().getFullYear()} INKWELL. All rights reserved.</div>
          </div>
        </div>
      `,
    };

    console.log('Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Verify the transporter
    await transporter.verify();
    console.log('Server is ready to take our messages');

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('=== Email Sending Error ===');
    console.error('Error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
} 