import { Prisma, Settings } from '@prisma/client';
import {
  SettingCreateDto,
  SettingDto,
  SettingValueDto,
} from '../dto/setting.dto';

export class SettingMapper {
  static toEntity(dto: SettingCreateDto) {
    return {
      key: dto.key,
      app_code: dto.app_code,
      is_all: dto.is_all,
    } as Prisma.SettingsUncheckedCreateInput;
  }
  static toDto(setting: Settings) {
    return {
      id: setting.id,
      key: setting.key,
      app_code: setting.app_code,
      is_all: setting.is_all,
      is_active: setting.is_active,
    } as SettingDto;
  }

  static toDtoIncluceValue(data: {
    id: number;
    key: string;
    app_code: string;
    is_all: boolean;
    is_active: boolean;
    values: {
      id: number;
      is_active: boolean;
      value: string;
      setting_id: number;
    }[];
  }) {
    return {
      app_code: data.app_code,
      id: data.id,
      is_all: data.is_all,
      is_active: data.is_active,
      key: data.key,
      values: data.values,
    } as SettingValueDto;
  }
}
