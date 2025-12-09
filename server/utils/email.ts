import nodemailer from 'nodemailer'

// Create reusable transporter
const createTransporter = () => {
  const config = useRuntimeConfig()
  
  // For development, you can use a test account
  // For production, use your SMTP server
  return nodemailer.createTransport({
    host: config.smtpHost || 'smtp.gmail.com',
    port: Number(config.smtpPort) || 587,
    secure: config.smtpSecure === 'true',
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })
}

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const config = useRuntimeConfig()
  const resetUrl = `${config.public.siteUrl}/reset-password?token=${resetToken}`
  
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Typing Master" <${config.smtpUser}>`,
    to: email,
    subject: 'Reset Your Password - Typing Master',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background-color: #4F46E5; border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Typing Master</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Reset Your Password</h2>
                      <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                        We received a request to reset your password. Click the button below to create a new password.
                      </p>
                      <table role="presentation" style="margin: 30px 0;">
                        <tr>
                          <td style="border-radius: 4px; background-color: #4F46E5;">
                            <a href="${resetUrl}" style="display: inline-block; padding: 16px 36px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.5;">
                        Or copy and paste this link into your browser:
                      </p>
                      <p style="margin: 0 0 20px 0; color: #4F46E5; font-size: 14px; word-break: break-all;">
                        ${resetUrl}
                      </p>
                      <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px; line-height: 1.5;">
                        This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px; text-align: center; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                      <p style="margin: 0; color: #999999; font-size: 12px;">
                        © 2025 Typing Master. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  }
  
  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  }
  catch (error) {
    console.error('Error sending password reset email:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(email: string, username: string) {
  const config = useRuntimeConfig()
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Typing Master" <${config.smtpUser}>`,
    to: email,
    subject: 'Welcome to Typing Master!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Typing Master</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background-color: #4F46E5; border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Welcome to Typing Master!</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Hello ${username}!</h2>
                      <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                        Thank you for joining Typing Master! We're excited to help you improve your typing skills.
                      </p>
                      <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                        Get started by:
                      </p>
                      <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #666666; font-size: 16px; line-height: 1.8;">
                        <li>Taking your first typing speed test</li>
                        <li>Practicing with different articles in multiple languages</li>
                        <li>Tracking your progress on your profile</li>
                        <li>Competing on the leaderboards</li>
                      </ul>
                      <table role="presentation" style="margin: 30px 0;">
                        <tr>
                          <td style="border-radius: 4px; background-color: #4F46E5;">
                            <a href="${config.public.siteUrl}" style="display: inline-block; padding: 16px 36px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">
                              Start Typing
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px; text-align: center; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                      <p style="margin: 0; color: #999999; font-size: 12px;">
                        © 2025 Typing Master. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  }
  
  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  }
  catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error }
  }
}

export async function sendVerificationEmail(email: string, verificationToken: string) {
  const config = useRuntimeConfig()
  const verificationUrl = `${config.public.siteUrl}/verify-email?token=${verificationToken}`
  
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Typing Master" <${config.smtpUser}>`,
    to: email,
    subject: 'Verify Your Email - Typing Master',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background-color: #4F46E5; border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Typing Master</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Verify Your Email Address</h2>
                      <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                        Thanks for signing up! Please verify your email address to complete your registration and get full access to all features.
                      </p>
                      <table role="presentation" style="margin: 30px 0;">
                        <tr>
                          <td style="border-radius: 4px; background-color: #4F46E5;">
                            <a href="${verificationUrl}" style="display: inline-block; padding: 16px 36px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">
                              Verify Email
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.5;">
                        Or copy and paste this link into your browser:
                      </p>
                      <p style="margin: 0 0 20px 0; color: #4F46E5; font-size: 14px; word-break: break-all;">
                        ${verificationUrl}
                      </p>
                      <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px; line-height: 1.5;">
                        This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px; text-align: center; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                      <p style="margin: 0; color: #999999; font-size: 12px;">
                        © 2025 Typing Master. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  }
  
  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  }
  catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, error }
  }
}
