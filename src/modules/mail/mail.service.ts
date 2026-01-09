import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ASSETS } from '../../assets/assets.constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(
    to: string,
    name: string,
    options: {
      buttonUrl: string;
      courseName: string;
    },
  ) {
    await this.mailerService.sendMail({
      to,
      subject: `Welcome to ${options.courseName}!`,
      template: './welcome',
      context: {
        ASSETS,
        name,
        title: `Welcome to ${options.courseName}!`,
        ...options,
      },
    });
  }

  async sendResetPasswordEmail(
    to: string,
    name: string,
    options: {
      buttonUrl: string;
    },
  ) {
    await this.mailerService.sendMail({
      to,
      subject: `Reset Your Password`,
      template: 'reset-password',
      context: {
        ASSETS,
        name,
        ...options,
      },
    });
  }
}
