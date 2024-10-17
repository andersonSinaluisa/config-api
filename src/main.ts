import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const isCommand = process.argv.some((arg) => arg.startsWith('exec'));
  if (isCommand) {
    await CommandFactory.run(AppModule);
  } else {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_HOST],
        },
        consumer: {
          groupId: process.env.KAFKA_CLIENT_ID,
        },
      },
    });
    await app.startAllMicroservices();

    await app.listen(3001);
  }
}
bootstrap();
