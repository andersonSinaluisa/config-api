import { Injectable } from '@nestjs/common';
import { Smtp } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class MailRepository {
  constructor(private readonly db: PrismaService) { }

  async create(data: Smtp) {
    return await this.db.smtp.create({
      data,
    });
  }

  async findOne(where: { id: number }) {
    return await this.db.smtp.findFirst({
      where,
    });
  }

  async findMany() {
    return await this.db.smtp.findMany();
  }

  async update(data: Smtp) {
    return await this.db.smtp.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(where: { id: number }) {
    return await this.db.smtp.delete({
      where,
    });
  }

  async deleteMany() {
    return await this.db.smtp.deleteMany();
  }

  async findFirst(where: { id: number }) {
    return await this.db.smtp.findFirst({
      where,
    });
  }

  async findUnique(where: { id: number }) {
    return await this.db.smtp.findUnique({
      where,
    });
  }

  async updateMany(data: Smtp) {
    return await this.db.smtp.updateMany({
      where: { id: data.id },
      data,
    });
  }

  async upsert(data: Smtp) {
    return await this.db.smtp.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async findForApp(app_code: string) {
    return await this.db.smtp.findFirst({
      where: {
        app_code,
      },
    });
  }

  async findOneGeneral() {
    return await this.db.smtp.findFirst({
      where: {
        is_all: true,
      },
    });
  }
}
