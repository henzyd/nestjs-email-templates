import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/mail/mail.module';
import { MailService } from './modules/mail/mail.service';

@Module({
  imports: [MailModule],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
