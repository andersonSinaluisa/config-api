import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MailModule } from 'src/mail/mail.module';
import { MailRepository } from 'src/mail/repository/mail.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [MailModule, SharedModule],
  controllers: [EventsController],
  providers: [MailRepository, PrismaService, EventsService],
})
export class EventsModule { }
