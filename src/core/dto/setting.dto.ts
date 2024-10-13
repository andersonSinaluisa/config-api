export class SettingDto {
  id: number;
  key: string;
  description: string;
  app_code: string;
  is_all: boolean;
  is_active: boolean;
}

export class SettingCreateDto {
  key: string;
  value: string;
  description: string;
  app_code: string;
  is_all: boolean;
}

export class ValueDto {
  id: number;
  value: string;
  setting_id: number;
}

export class ValueCreateDto {
  value: string;
  setting_id: number;
}

export class SettingValueDto extends SettingDto {
  values: ValueDto[];
}
