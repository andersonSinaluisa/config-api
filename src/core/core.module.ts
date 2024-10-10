import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CoreRepository } from './repository/core.repository';

@Module({
  controllers: [CoreController],
  providers: [CoreRepository, CoreService, PrismaService],
  imports: [SharedModule],
})
export class CoreModule {}
