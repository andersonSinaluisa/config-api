import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { MailModule } from './mail/mail.module';
import { SharedModule } from './shared/shared.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsModule } from './events/events.module';
import { CommandRunnerModule } from 'nest-commander';
import { CreateStmpCommand } from './commands/create-smtp-command';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    CommandRunnerModule,
    CoreModule,
    MailModule,
    SharedModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-kafka-client', // Identificador del cliente Kafka
            brokers: ['localhost:9092'], // Dirección del broker de Kafka
          },
          consumer: {
            groupId: 'my-consumer-group', // Identificador del grupo de consumidores
          },
        },
      },
    ]),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService, CreateStmpCommand],
})
export class AppModule { }
