import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ASSETS } from '../../assets/assets.constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(
    to: string,
    name: string,
    options?: {
      buttonUrl?: string;
      companyName?: string;
      footerText?: string;
      socialLinks?: {
        twitter?: string;
        linkedin?: string;
        instagram?: string;
      };
    },
  ) {
    const currentYear = new Date().getFullYear();
    const companyName = options?.companyName || 'Our Company';
    const footerText =
      options?.footerText ||
      'Thank you for joining us! We look forward to serving you.';

    await this.mailerService.sendMail({
      to,
      subject: `Welcome to ${companyName}!`,
      template: 'welcome',
      context: {
        name,
        title: `Welcome to ${companyName}`,
        companyName,
        logo: ASSETS.email.logo,
        buttonUrl: options?.buttonUrl,
        footerText,
        currentYear,
        socialLinks: options?.socialLinks
          ? {
              twitter: options.socialLinks.twitter,
              linkedin: options.socialLinks.linkedin,
              instagram: options.socialLinks.instagram,
              twitterIcon: ASSETS.email.twitterIcon,
              linkedinIcon: ASSETS.email.linkedinIcon,
              instagramIcon: ASSETS.email.instagramIcon,
            }
          : undefined,
      },
    });
  }
}
