export class SettingDto {
  id: number;
  key: string;
  value: string;
  app_code: string;
  is_all: boolean;
  is_active: boolean;
}

export class SettingCreateDto {
  key: string;
  value: string;
  app_code: string;
  is_all: boolean;
}
