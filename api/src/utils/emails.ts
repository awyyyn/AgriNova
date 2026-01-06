export function forgotPasswordEmail(resetLink: string, userName = "User") {
	return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Reset Your Password</title>
    </head>
    <body style="
      font-family: Segoe UI, Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    ">
      <div style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #f5f5f5;
      ">
        <!-- Header -->
        <div style="
          background-color: #22c55e;
          padding: 40px 20px;
          text-align: center;
          border-radius: 12px 12px 0 0;
        ">
          <div style="font-size: 48px; margin-bottom: 10px;">🌿</div>
          <h1 style="
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          ">AgriNova</h1>
        </div>

        <!-- Content -->
        <div style="
          background-color: white;
          padding: 40px 30px;
        ">
          <h2 style="
            color: #22c55e;
            font-size: 24px;
            margin-top: 0;
          ">
            Reset Your Password
          </h2>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hi ${userName},
          </p>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We received a request to reset your password. Click the button below
            to set a new password. This link will expire in 24 hours.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="
              display: inline-block;
              background-color: #22c55e;
              color: white;
              padding: 12px 40px;
              border-radius: 24px;
              text-decoration: none;
              font-size: 16px;
              font-weight: bold;
            ">
              Reset Password
            </a>
          </div>

          <p style="color: #374151; font-size: 16px;">
            Or copy and paste this link in your browser:
          </p>

          <p style="
            color: #059669;
            font-size: 13px;
            word-break: break-all;
            padding: 12px;
            background-color: #f0fdf4;
            border-radius: 6px;
          ">
            ${resetLink}
          </p>

          <p style="
            color: #6b7280;
            font-size: 14px;
            font-style: italic;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          ">
            If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="
          background-color: #f9fafb;
          padding: 20px 30px;
          border-radius: 0 0 12px 12px;
          text-align: center;
        ">
          <p style="
            color: #9ca3af;
            font-size: 13px;
            margin: 0;
          ">
            © 2025 AgriNova. From detection to action – your smart farming partner.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;
}

export function welcomeEmail(userName = "User") {
	return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Welcome to AgriNova</title>
    </head>
    <body style="
      font-family: Segoe UI, Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    ">
      <div style="max-width: 600px; margin: 0 auto;">
        <!-- Header -->
        <div style="
          background-color: #22c55e;
          padding: 40px 20px;
          text-align: center;
          border-radius: 12px 12px 0 0;
        ">
          <div style="font-size: 48px; margin-bottom: 10px;">🌿</div>
          <h1 style="
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          ">AgriNova</h1>
        </div>

        <!-- Content -->
        <div style="background-color: white; padding: 40px 30px;">
          <h2 style="
            color: #22c55e;
            font-size: 24px;
            margin-top: 0;
          ">
            Welcome to AgriNova 🎉
          </h2>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hi ${userName},
          </p>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We’re excited to have you on board! AgriNova helps you move from
            detection to action with smart, data-driven farming solutions.
          </p>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            You can now:
          </p>

          <ul style="color: #374151; font-size: 16px; line-height: 1.6;">
            <li>Monitor crop health</li>
            <li>Detect issues early</li>
            <li>Make smarter farming decisions</li>
          </ul>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://agrinova.app/login" style="
              display: inline-block;
              background-color: #22c55e;
              color: white;
              padding: 12px 40px;
              border-radius: 24px;
              text-decoration: none;
              font-size: 16px;
              font-weight: bold;
            ">
              Get Started
            </a>
          </div>

          <p style="
            color: #6b7280;
            font-size: 14px;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          ">
            If you have any questions, just reply to this email — we’re here to help.
          </p>
        </div>

        <!-- Footer -->
        <div style="
          background-color: #f9fafb;
          padding: 20px 30px;
          border-radius: 0 0 12px 12px;
          text-align: center;
        ">
          <p style="color: #9ca3af; font-size: 13px; margin: 0;">
            © 2025 AgriNova. From detection to action – your smart farming partner.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;
}
