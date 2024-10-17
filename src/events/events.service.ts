import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailRepository } from '../mail/repository/mail.repository';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';


@Injectable()
export class EventsService {
  constructor(private readonly mailRepository: MailRepository) { }

  async sendDynamicMail(
    app_code: string,
    to: string,
    subject: string,
    template: string,
    context: any,
  ) {
    // Obtener las credenciales SMTP de la base de datos
    let smtpConfig = await this.mailRepository.findForApp(app_code);
    if (!smtpConfig) {
      smtpConfig = await this.mailRepository.findOneGeneral();
    }
    if (!smtpConfig) {
      throw new BadRequestException('No SMTP configuration found');
    }
    // Crear una instancia del servicio Mailer con las credenciales dinámicas

    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.isSecure, // or true based on your SMTP configuration
      auth: {
        user: smtpConfig.email,
        pass: smtpConfig.password,
      },
    });

    const htmlfile = path.join(__dirname, 'templates', template + '.hbs');
    const htmlcontent = fs.readFileSync(htmlfile, 'utf8');

    const template_ = handlebars.compile(htmlcontent);

    const htmlToSend = template_(context);
    console.log(htmlToSend);
    // Enviar el correo usando el transporte dinámico
    const res = transporter.sendMail(
      {
        from: smtpConfig.email, // remitente
        to, // destinatario
        subject, // asunto del correo
        html: htmlToSend, // plantilla HTML
        priority: 'high', // prioridad del correo
      },
      (err, info) => {
        if (err) {
          console.error(err);
        }
        console.log(info);
      },
    );
    return res;
  }
}
