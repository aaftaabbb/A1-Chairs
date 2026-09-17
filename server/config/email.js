const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: parseInt(process.env.BREVO_SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY
  }
});

const sendEnquiryEmail = async (enquiry) => {
  try {
    const mailOptions = {
      from: `"A1 Chairs Website" <${process.env.EMAIL_FROM || process.env.BREVO_SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Enquiry from ${enquiry.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">New Enquiry - A1 Chairs</h2>
          <hr style="border: 1px solid #ddd;">
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Phone:</strong> ${enquiry.phone}</p>
          <p><strong>Message:</strong> ${enquiry.message || 'No message provided'}</p>
          ${enquiry.productInterested ? `<p><strong>Product Interested:</strong> ${enquiry.productInterested}</p>` : ''}
          <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <hr style="border: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">This enquiry was submitted through the A1 Chairs website contact form.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Enquiry email sent successfully');
  } catch (error) {
    console.error('Failed to send enquiry email:', error.message);
  }
};

module.exports = { sendEnquiryEmail };