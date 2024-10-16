export class SendMailMapper {
  static toEntity(data: object): any {
    const parsed = JSON.parse(JSON.stringify(data));
    return {
      app_code: parsed.app_code,
      to: parsed.to,
      subject: parsed.subject,
      template: parsed.template,
      context: parsed.context,
    };
  }
}
