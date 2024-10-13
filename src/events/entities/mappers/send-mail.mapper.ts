export class SendMailMapper {
  static toEntity(data: string): any {
    const parsed = JSON.parse(data);
    return {
      app_code: parsed.app_code,
      to: parsed.to,
      subject: parsed.subject,
      template: parsed.template,
      context: parsed.context,
    };
  }
}
