import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { MailService } from '../src/modules/mail/mail.service';

/**
 * Script to send welcome emails
 *
 * Usage:
 *   npm run script:mail <email> <name> [buttonUrl]
 *
 * Examples:
 *   npm run script:mail user@example.com "John Doe"
 *   npm run script:mail user@example.com "John Doe" https://example.com/get-started
 */
async function bootstrap() {
  // Show usage if help is requested
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Usage: npm run script:mail <email> <name> [buttonUrl]

Arguments:
  email      Recipient email address (required)
  name       Recipient name (required)
  buttonUrl  Optional button URL for the CTA

Examples:
  npm run script:mail user@example.com "John Doe"
  npm run script:mail user@example.com "John Doe" https://example.com/get-started
    `);
    process.exit(0);
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  const mailService = app.get(MailService);

  // Get email details from command line arguments
  const recipientEmail = process.argv[2];
  const recipientName = process.argv[3];
  const buttonUrl = process.argv[4];

  // Validate required arguments
  if (!recipientEmail || !recipientName) {
    console.error('❌ Error: Email and name are required');
    console.log('Usage: npm run script:mail <email> <name> [buttonUrl]');
    console.log('Example: npm run script:mail user@example.com "John Doe"');
    await app.close();
    process.exit(1);
  }

  try {
    console.log(`📧 Sending welcome email to ${recipientEmail}...`);

    // await mailService.sendWelcomeEmail(recipientEmail, recipientName);

    await mailService.sendCourseEnrollmentConfirmationEmail(
      recipientEmail,
      recipientName,
      {
        buttonUrl: buttonUrl || 'https://example.com/get-started',
        courseName: 'NestJS Email Templates',
      },
    );

    // await mailService.sendGeneralEmail(recipientEmail, recipientName, {
    //   title: 'General Email',
    //   content: 'This is a general email',
    // });

    console.log('✅ Welcome email sent successfully!');
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }
    await app.close();
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();
