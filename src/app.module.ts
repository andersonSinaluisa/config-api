import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { MailModule } from './mail/mail.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CoreModule, MailModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
