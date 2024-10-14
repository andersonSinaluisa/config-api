import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailRepository } from './repository/mail.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [PrismaService, MailRepository, MailService],
  controllers: [MailController],
  exports: [MailRepository],
})
export class MailModule {}
