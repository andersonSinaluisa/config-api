import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { MailRepository } from '../mail/repository/mail.repository';

@Injectable()
export class EventsService {
  constructor(
    private readonly mailRepository: MailRepository,
    private readonly mailerService: MailerService,
  ) {}

  async sendDynamicMail(
    app_code: string,
    to: string,
    subject: string,
    template: string,
    context: any,
  ): Promise<SentMessageInfo> {
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
      port: smtpConfig.port,
    });

    // Enviar el correo usando el transporte dinámico
    const res: SentMessageInfo = await this.mailerService.sendMail({
      to, // destinatario
      subject, // asunto del correo
      template: './src/mail/templates/' + template, // plantilla de correo
      context, // contexto de la plantilla (datos dinámicos)
      transporterName: 'dynamicTransport', // nombre del transporte
    });
    return res as SentMessageInfo;
  }
}
