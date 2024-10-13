import { Smtp } from '@prisma/client';
import { SmtpCreateDto, SmtpDto } from '../dto/mail.dto';

export class MailMapper {
  static toEntity(data: SmtpCreateDto) {
    return {
      app_code: data.app_code,
      email: data.email,
      is_all: data.is_all,
      isSecure: data.isSecure,
      password: data.password,
      port: data.port,
      is_active: data.is_active,
      host: data.host,
    } as Smtp;
  }

  static toDto(data: Smtp) {
    return {
      app_code: data.app_code,
      email: data.email,
      is_all: data.is_all,
      isSecure: data.isSecure,
      password: data.password,
      port: data.port,
      is_active: data.is_active,
      host: data.host,
    } as SmtpDto;
  }
}
