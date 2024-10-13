import { BadRequestException, Injectable } from '@nestjs/common';
import { MailRepository } from './repository/mail.repository';
import { SmtpCreateDto } from './dto/mail.dto';
import { MailMapper } from './entities/mail.mapper';

@Injectable()
export class MailService {
  constructor(private readonly mailRepository: MailRepository) {}

  async create(data: SmtpCreateDto) {
    const exist = await this.mailRepository.findForApp(data.app_code);
    if (exist) {
      throw new BadRequestException(
        'Ya existe un registro para esta aplicación',
      );
    }
    return await this.mailRepository.create(MailMapper.toEntity(data));
  }

  async findOne(id: number) {
    return await this.mailRepository.findOne({ id });
  }

  async findMany() {
    return await this.mailRepository.findMany();
  }

  async update(data: SmtpCreateDto) {
    return await this.mailRepository.update(MailMapper.toEntity(data));
  }

  async delete(id: number) {
    return await this.mailRepository.delete({ id });
  }
}
