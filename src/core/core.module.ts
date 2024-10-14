import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { SharedModule } from '../shared/shared.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CoreRepository } from './repository/core.repository';

@Module({
  controllers: [CoreController],
  providers: [CoreRepository, CoreService, PrismaService],
  imports: [SharedModule],
})
export class CoreModule {}
