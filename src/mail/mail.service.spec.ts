import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    expect(service.create).toBeDefined();
    const res = await service.create({
      app_code: 'test',
      email: 'test',
      host: 'sadsad',
      isSecure: true,
      password: 'test',
      port: 578,
      is_all: false,
      is_active: false,
    });
    expect(res).toBeDefined();
    expect(res.app_code).toBe('test');
    expect(res.email).toBe('test');
    expect(res.host).toBe('sadsad');
    expect(res.isSecure).toBe(true);
    expect(res.password).toBe('test');
    expect(res.port).toBe(578);
    expect(res.is_all).toBe(false);
    expect(res.is_active).toBe(false);
  });

  it('findOne', async () => {
    expect(service.findOne).toBeDefined();
    const res = await service.findOne(1);
    expect(res).toBeDefined();
    expect(res.id).toBe(1);
  });
});
