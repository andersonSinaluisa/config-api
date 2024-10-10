import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreRepository } from './repository/core.repository';

@Injectable()
export class CoreService {
  constructor(private readonly repository: CoreRepository) {}

  async options() {
    return await this.repository.options();
  }

  async setting(key: string) {
    return await this.repository.setting(key);
  }

  async create(key: string, value: string, appcode: string, is_all: boolean) {
    const isExist = await this.repository.findSettingByAppCodeAndKey(
      appcode,
      key,
    );
    if (isExist) {
      throw new BadRequestException(
        'Ya existe una configuración para esta aplicación',
      );
    }
    return await this.repository.create(key, value, appcode, is_all);
  }

  async updateValue(id: number, value: string) {
    return await this.repository.updateValue(id, value);
  }

  async deleteValue(id: number) {
    return await this.repository.deleteValue(id);
  }
}
