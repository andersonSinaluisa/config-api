export class SmtpCreateDto {
  email: string;
  host: string;
  password: string;
  port: number;
  isSecure: boolean;
  app_code: string;
  is_all: boolean;
  is_active: boolean;
}

export class SmtpDto {
  id: number;
  host: string;
  email: string;
  password: string;
  port: number;
  isSecure: boolean;
  app_code: string;
  is_all: boolean;
  is_active: boolean;
}
