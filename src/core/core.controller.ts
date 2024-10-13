import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoreService } from './core.service';
import { SettingCreateDto, ValueCreateDto } from './dto/setting.dto';

@Controller('core')
export class CoreController {
  constructor(private readonly _core: CoreService) {}

  @Get('options')
  options() {
    return this._core.options();
  }

  @Get('setting/:key')
  getSetting(@Param(':key') key: string) {
    return this._core.setting(key);
  }

  @Post('setting')
  createSetting(@Body() data: SettingCreateDto) {
    return this._core.create(
      data.key,
      data.description,
      data.value,
      data.app_code,
      data.is_all,
    );
  }

  @Delete('setting/:id')
  deleteSetting(@Param(':id') id: number) {
    return this._core.delete(id);
  }

  @Patch('setting/:id')
  updateSetting(@Param(':id') id: number, @Body() data: SettingCreateDto) {
    return this._core.update(id, data.key, data.description);
  }

  @Patch('value/:id')
  updateValue(@Param(':id') id: number, @Body() data: ValueCreateDto) {
    return this._core.updateValue(id, data.value);
  }
  @Delete('value/:id')
  deleteValue(@Param(':id') id: number) {
    return this._core.deleteValue(id);
  }
}
