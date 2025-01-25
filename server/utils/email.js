const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const getEmailTemplate = (template, data) => {
  switch (template) {
    case 'verifyEmail':
      return {
        subject: 'Please verify your email',
        html: `
          <h1>Welcome to ContentKosh!</h1>
          <p>Hi ${data.name},</p>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${data.verificationURL}" style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          ">Verify Email</a>
          <p>If you did not create an account, please ignore this email.</p>
        `
      };
    case 'resetPassword':
      return {
        subject: 'Password Reset Request',
        html: `
          <h1>Password Reset</h1>
          <p>Hi ${data.name},</p>
          <p>You requested to reset your password. Click the link below to reset it:</p>
          <a href="${data.resetURL}" style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #2196F3;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          ">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
        `
      };
    default:
      throw new Error('Email template not found');
  }
};

exports.sendEmail = async ({ email, subject, template, data }) => {
  try {
    const transporter = createTransporter();
    const emailTemplate = getEmailTemplate(template, data);

    const mailOptions = {
      from: `"ContentKosh" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: subject || emailTemplate.subject,
      html: emailTemplate.html
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Error sending email');
  }
}; 