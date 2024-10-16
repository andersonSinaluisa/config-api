import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
import { SendMailMapper } from './entities/mappers/send-mail.mapper';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }
  @MessagePattern('send-mail')
  handleMessage(@Payload() message: object) {
    const payload = SendMailMapper.toEntity(message);
    return this.eventsService.sendDynamicMail(
      payload.app_code,
      payload.to,
      payload.subject,
      payload.template,
      payload.context,
    );
  }
}
