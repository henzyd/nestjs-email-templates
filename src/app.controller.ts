import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './modules/mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('mail')
  async sendMail(): Promise<string> {
    await this.mailService.sendWelcomeEmail('henzyd.dev@gmail.com', 'Henzyd', {
      buttonUrl: 'https://www.google.com',
      courseName: 'Test Course',
    });
    return 'Mail sent';
  }
}
