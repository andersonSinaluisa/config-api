import { BadRequestException, Injectable } from '@nestjs/common';
import { MailRepository } from './repository/mail.repository';
import { SmtpCreateDto } from './dto/mail.dto';
import { MailMapper } from './entities/mail.mapper';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailRepository: MailRepository,
    private readonly mailerService: MailerService,
  ) {}

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

  async sendDynamicMail(
    app_code: string,
    to: string,
    subject: string,
    template: string,
    context: any,
  ) {
    // Obtener las credenciales SMTP de la base de datos
    const smtpConfig = await this.mailRepository.findForApp(app_code);
    if (!smtpConfig) {
      throw new BadRequestException(
        'No se encontraron credenciales SMTP para esta aplicación',
      );
    }

    // Crear una instancia del servicio Mailer con las credenciales dinámicas
    this.mailerService.addTransporter('dynamicTransport', {
      host: smtpConfig.host,
      secure: smtpConfig.isSecure,
      auth: {
        user: smtpConfig.email,
        pass: smtpConfig.password,
      },
    });

    // Enviar el correo usando el transporte dinámico
    await this.mailerService.sendMail({
      to, // destinatario
      subject, // asunto del correo
      template, // nombre de la plantilla
      context, // contexto de la plantilla (datos dinámicos)
      transporterName: 'dynamicTransport', // nombre del transporte
    });
  }
}
