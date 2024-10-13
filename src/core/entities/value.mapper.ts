import { Prisma, Values } from '@prisma/client';
import { ValueDto } from '../dto/setting.dto';
export class ValueMapper {
  static toDto(value: Values): ValueDto {
    return {
      id: value.id,
      setting_id: value.setting_id,
      value: value.value,
    };
  }

  static toEntity(dto: ValueDto) {
    return {
      id: dto.id,
      value: dto.value,
      setting_id: dto.setting_id,
    } as Prisma.ValuesUncheckedCreateInput;
  }
}
