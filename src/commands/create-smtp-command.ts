import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import inquirer from 'inquirer';
import { MailService } from 'src/mail/mail.service';

@Injectable()
@Command({
  name: 'exec-create-smtp',
  description: 'Crea una configuración smtp',
})
export class CreateStmpCommand extends CommandRunner {
  constructor(private mailService: MailService) {
    super();
  }

  async run(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'app_code',
        message: 'Introduce el código de la aplicación:',
      },
      {
        type: 'input',
        name: 'host',
        message: 'Introduce el host del servidor smtp:',
      },
      {
        type: 'input',
        name: 'port',
        message: 'Introduce el puerto del servidor smtp:',
      },
      {
        type: 'input',
        name: 'username',
        message: 'Introduce el usuario del servidor smtp:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Introduce la contraseña del servidor smtp:',
      },
      {
        type: 'confirm',
        name: 'is_secure',
        message: '¿Es seguro el servidor smtp?',
      },
      {
        type: 'confirm',
        name: 'is_active',
        message: '¿Está activo el servidor smtp?',
      },
      {
        type: 'confirm',
        name: 'is_all',
        message: '¿Es para todos las aplicaciones?',
      },
    ]);
    // Usa el servicio para crear la configuración smtp
    await this.mailService.create({
      host: answers.host,
      port: answers.port,
      email: answers.username,
      password: answers.password,
      isSecure: answers.is_secure,
      app_code: answers.app_code,
      is_all: answers.is_all,
      is_active: answers.is_active,
    });
    console.log('Configuración smtp creada correctamente');
  }
}
