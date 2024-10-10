import { Controller, Get } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('core')
export class CoreController {
  constructor(private readonly _core: CoreService) {}

  @Get('options')
  async options() {
    return await this._core.options();
  }
}
