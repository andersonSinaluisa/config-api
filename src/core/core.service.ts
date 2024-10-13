import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreRepository } from './repository/core.repository';
import { SettingMapper } from './entities/setting.mapper';
import { SettingDto } from './dto/setting.dto';
import { ValueMapper } from './entities/value.mapper';

@Injectable()
export class CoreService {
  constructor(private readonly repository: CoreRepository) {}

  async options() {
    const res = await this.repository.options();
    return res as SettingDto[];
  }

  async setting(key: string) {
    const res = await this.repository.setting(key);
    return SettingMapper.toDtoIncluceValue(res);
  }

  async create(
    key: string,
    description: string,
    value: string,
    appcode: string,
    is_all: boolean,
  ) {
    const isExist = await this.repository.findSettingByAppCodeAndKey(
      appcode,
      key,
    );
    if (isExist) {
      throw new BadRequestException(
        'Ya existe una configuración para esta aplicación',
      );
    }
    const res = await this.repository.create(
      key,
      description,
      value,
      appcode,
      is_all,
    );
    return SettingMapper.toDto(res);
  }

  async update(id: number, key: string, description: string) {
    const res = await this.repository.update(id, key, description);
    return SettingMapper.toDto(res);
  }

  async delete(id: number) {
    return await this.repository.deleteSetting(id);
  }
  async updateValue(id: number, value: string) {
    const res = await this.repository.updateValue(id, value);
    return ValueMapper.toDto(res);
  }

  async deleteValue(id: number) {
    return await this.repository.deleteValue(id);
  }
}
