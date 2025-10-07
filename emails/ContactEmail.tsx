import * as React from 'react'

interface ContactEmailProps {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactEmail({ name, email, subject, message }: ContactEmailProps) {
  return (
    <html>
      <head>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%);
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
          }
          .header p {
            margin: 10px 0 0;
            color: #bae6fd;
            font-size: 16px;
          }
          .content {
            padding: 40px 30px;
          }
          .field {
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #e5e7eb;
          }
          .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .field-label {
            font-weight: 600;
            color: #0ea5e9;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .field-value {
            color: #111827;
            font-size: 16px;
          }
          .message-box {
            background-color: #f9fafb;
            border-left: 4px solid #0ea5e9;
            padding: 20px;
            border-radius: 4px;
            margin-top: 10px;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #0c4a6e;
            padding: 30px 20px;
            text-align: center;
            color: #bae6fd;
            font-size: 14px;
          }
          .footer a {
            color: #0ea5e9;
            text-decoration: none;
          }
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e5e7eb, transparent);
            margin: 30px 0;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>🏄 New Contact Form Submission</h1>
            <p>From Surf Shop Website</p>
          </div>
          
          <div className="content">
            <div className="field">
              <div className="field-label">From</div>
              <div className="field-value"><strong>{name}</strong></div>
            </div>

            <div className="field">
              <div className="field-label">Email</div>
              <div className="field-value">
                <a href={`mailto:${email}`} style={{ color: '#0ea5e9', textDecoration: 'none' }}>
                  {email}
                </a>
              </div>
            </div>

            <div className="field">
              <div className="field-label">Subject</div>
              <div className="field-value">{subject}</div>
            </div>

            <div className="field">
              <div className="field-label">Message</div>
              <div className="message-box">{message}</div>
            </div>

            <div className="divider"></div>

            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '30px' }}>
              💡 <strong>Quick Reply:</strong> You can reply directly to this email to respond to {name}.
            </p>
          </div>

          <div className="footer">
            <p style={{ margin: '0 0 10px' }}>
              <strong>Surf Shop</strong> - Premium Surf Gear & Apparel
            </p>
            <p style={{ margin: '0' }}>
              123 Surf Avenue, Santa Cruz, CA 95060
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}