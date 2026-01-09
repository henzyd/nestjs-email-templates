import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        const isProduction = process.env.NODE_ENV === 'production';

        if (
          isProduction &&
          (!process.env.SMTP_HOST ||
            !process.env.SMTP_PORT ||
            !process.env.SMTP_USER ||
            !process.env.SMTP_PASSWORD)
        ) {
          throw new Error('Missing required SMTP environment variables');
        }

        const templatesDir = join(process.cwd(), 'src', 'templates');

        return {
          transport: isProduction
            ? {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT!, 10),
                secure: process.env.SMTP_PORT === '465',
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASSWORD,
                },
              }
            : {
                jsonTransport: true,
              },
          defaults: {
            from: 'Email Templates <onboarding@zydcode.com>',
          },
          template: {
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          preview: !isProduction,
          options: {
            partials: {
              dir: join(templatesDir, 'partials'),
              options: {
                strict: true,
              },
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
