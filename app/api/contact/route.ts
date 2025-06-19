import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Keep recipient email server-side
const AGENCY_EMAIL = 'hello@bti.co';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email, task } = await request.json();

    // Validate inputs
    if (!email || !task) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Track success/failure of operations
    const results = {
      emailSent: false,
      webhookSent: false,
      errors: [] as string[]
    };

    // Send emails via Resend
    try {
      // Send notification email to BTI
      await resend.emails.send({
        from: 'BTI <secretary@bti.co>',
        to: [AGENCY_EMAIL],
        subject: '[ NEW CLIENT INQUIRY ] BTI',
        html: `
          <div style="font-family: monospace; padding: 20px; border: 2px solid black;">
            <h1 style="border-bottom: 2px solid black; padding-bottom: 10px;">NEW CLIENT INQUIRY</h1>
            
            <div style="margin: 20px 0;">
              <strong>CLIENT EMAIL:</strong><br/>
              ${email}
            </div>
            
            <div style="margin: 20px 0;">
              <strong>PROJECT DESCRIPTION:</strong><br/>
              ${task}
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid black;">
              <strong>BTI</strong><br/>
              Artificial Intelligence Solutions
            </div>
          </div>
        `,
      });

      // Send confirmation email to the client
      await resend.emails.send({
        from: 'BTI <secretary@bti.co>',
        to: [email],
        subject: 'We received your inquiry - BTI',
        html: `
          <div style="font-family: monospace; padding: 20px; border: 2px solid black;">
            <h1 style="border-bottom: 2px solid black; padding-bottom: 10px;">Thank You for Reaching Out</h1>
            
            <div style="margin: 20px 0;">
              <p>We've received your inquiry about:</p>
              <div style="background: #f5f5f5; padding: 15px; margin: 10px 0; border-left: 4px solid black;">
                ${task}
              </div>
            </div>
            
            <div style="margin: 20px 0;">
              <p>Our team will review your request and get back to you if it aligns with our expertise.</p>
              <p>In the meantime, you can:</p>
              <ul style="margin-top: 10px;">
                <li><a href="https://discord.gg/amR4AEjqh4" style="color: black; text-decoration: underline;">Join Bootoshi's AI Class every Wednesday at 9am PST</a></li>
                <li><a href="https://improbable.beehiiv.com/" style="color: black; text-decoration: underline;">Read our blog</a></li>
                <li><a href="https://x.com/bti" style="color: black; text-decoration: underline;">Follow us on Twitter</a></li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid black;">
              <strong>BTI</strong><br/>
              Artificial Intelligence Solutions<br/>
              <a href="https://bti.co" style="color: black;">bti.co</a>
            </div>
          </div>
        `,
      });

      results.emailSent = true;
    } catch (error) {
      console.error('Error sending email:', error);
      results.errors.push('Failed to send emails');
    }

    // Send Discord webhook notification independently
    try {
      // Single-line comment: This will limit the message to 1000 characters for the Discord webhook
      const truncatedTask = task.length > 1000 ? task.slice(0, 1000) : task; 
      const webhookUrl = process.env.DISCORD_WEBHOOK;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            embeds: [{
              title: 'New Client Inquiry',
              color: 0x000000,
              thumbnail: {
                url: 'https://cdn.discordapp.com/attachments/1316276833888768051/1333888149184577556/image.png'
              },
              fields: [
                {
                  name: '📧 Client Email',
                  value: email,
                  inline: false
                },
                {
                  name: '📝 Project Description',
                  // Single-line comment: Truncated to avoid sending more than 1000 characters
                  value: truncatedTask,
                  inline: false
                },
                {
                  name: '📫 Email Status',
                  value: results.emailSent ? '✅ Sent successfully' : '❌ Failed to send',
                  inline: false
                }
              ],
              footer: {
                text: 'BTI | Artificial Intelligence Solutions | Sent from bti.co',
              },
              timestamp: new Date().toISOString()
            }]
          })
        });
        results.webhookSent = true;
      }
    } catch (error) {
      console.error('Error sending webhook:', error);
      results.errors.push('Failed to send Discord notification');
    }

    // Return appropriate response based on results
    if (results.errors.length > 0) {
      return NextResponse.json({
        success: false,
        emailSent: results.emailSent,
        webhookSent: results.webhookSent,
        errors: results.errors
      }, { status: 207 }); // 207 Multi-Status
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error processing inquiry' },
      { status: 500 }
    );
  }
} 