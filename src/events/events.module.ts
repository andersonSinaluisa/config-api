import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MailModule } from 'src/mail/mail.module';
import { MailRepository } from 'src/mail/repository/mail.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [MailModule, SharedModule, MailerModule.forRoot()],
  controllers: [EventsController],
  providers: [MailRepository, MailService, PrismaService, EventsService],
})
export class EventsModule {}
