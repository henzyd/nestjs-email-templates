import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

interface AssetUrls {
  logo: string;
  logoIcon: string;
  twitterIcon: string;
  linkedinIcon: string;
  instagramIcon: string;
  starIcon: string;
  targetIcon: string;
  trophyIcon: string;
}

interface SendEmailOptions {
  to: string;
  name: string;
  buttonUrl: string;
  courseName?: string;
}

interface EmailContext {
  ASSETS: AssetUrls;
  name: string;
  title?: string;
  buttonUrl?: string;
  courseName?: string;
  content?: string;
}

@Injectable()
export class MailService {
  private readonly assets: AssetUrls;
  private readonly cdnUrl: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.cdnUrl = this.configService.get<string>(
      'CDN_URL',
      'https://your-cdn-url.com',
    );

    this.assets = this.initializeAssets();
  }

  private initializeAssets(): AssetUrls {
    const assetPaths = {
      logo: 'oin6zpjjrnhjdcyzjqqq.png',
      logoIcon: 'cbsx3hkgkebktkvzyimg.png',
      twitterIcon: 'al3vud0lmy6eetpvfywk.png',
      linkedinIcon: 'iac6vww8vmnkeicksf0w.png',
      instagramIcon: 'ybogjaos9kwuz3krfmbm.png',
      starIcon: 'cp7icc6zpwga4q4v6hqi.png',
      targetIcon: 'de1xvezbygq1ylnmcjf4.png',
      trophyIcon: 'tnnyye0rjz79kun0nbyi.png',
    };

    return Object.entries(assetPaths).reduce(
      (acc, [key, path]) => ({
        ...acc,
        [key]: `${this.cdnUrl}/email/${path}`,
      }),
      {} as AssetUrls,
    );
  }

  private async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: Partial<EmailContext>,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context: {
        ASSETS: this.assets,
        ...context,
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const title = 'Welcome to Dreamax — Your Learning Journey Starts Now!';

    await this.sendEmail(to, title, 'welcome', {
      name,
      title,
    });
  }

  async sendCourseEnrollmentConfirmationEmail(
    to: string,
    name: string,
    options: Pick<SendEmailOptions, 'buttonUrl' | 'courseName'>,
  ): Promise<void> {
    const subject = `Welcome to ${options.courseName}!`;

    await this.sendEmail(to, subject, 'course-enrollment-confirmation', {
      name,
      title: subject,
      ...options,
    });
  }

  async sendResetPasswordEmail(
    to: string,
    name: string,
    options: Pick<SendEmailOptions, 'buttonUrl'>,
  ): Promise<void> {
    await this.sendEmail(to, 'Reset Your Password', 'reset-password', {
      name,
      ...options,
    });
  }

  async sendGeneralEmail(
    to: string,
    name: string,
    options: { title: string; content: string },
  ): Promise<void> {
    await this.sendEmail(to, options.title, 'general', {
      name,
      title: options.title,
      content: options.content,
    });
  }
}
