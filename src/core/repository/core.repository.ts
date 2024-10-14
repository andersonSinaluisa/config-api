import { Injectable } from '@nestjs/common';
import { Settings, Values } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class CoreRepository {
  constructor(private prismaService: PrismaService) {}

  async options() {
    const res = await this.prismaService.settings.findMany({
      orderBy: {
        key: 'desc',
      },
      where: {
        is_active: true,
      },
    });
    return res;
  }

  async setting(key: string) {
    const res = await this.prismaService.settings.findFirst({
      where: {
        key: key,
        is_active: true,
      },
      include: {
        values: true,
      },
    });

    return res;
  }

  async findSettingByAppCodeAndKey(appcode: string, key: string) {
    const res = await this.prismaService.settings.findFirst({
      where: {
        key: key,
        app_code: appcode,
        is_active: true,
      },
      include: {
        values: true,
      },
    });

    return res;
  }

  async create(
    key: string,
    description: string,
    value: string,
    appcode: string,
    is_all: boolean,
  ) {
    const res = await this.prismaService.settings.create({
      data: {
        key: key,
        app_code: appcode,
        description: description,
        values: {
          create: {
            value: value,
          },
        },
        is_all: is_all,
      },
    });
    return res as Settings;
  }

  async update(id: number, key: string, description: string) {
    const res = await this.prismaService.settings.update({
      where: {
        id: id,
      },
      data: {
        key: key,
        description: description,
      },
    });
    return res as Settings;
  }

  async updateValue(id: number, value: string) {
    const res = await this.prismaService.values.update({
      where: {
        id: id,
      },
      data: {
        value: value,
      },
    });
    return res as Values;
  }

  async deleteValue(id: number) {
    await this.prismaService.values.update({
      data: {
        is_active: false,
      },
      where: {
        id: id,
      },
    });
    return true;
  }

  async updateSetting(
    id: number,
    key: string,
    appcode: string,
    is_all: boolean,
  ) {
    const res = await this.prismaService.settings.update({
      where: {
        id: id,
      },
      data: {
        key: key,
        app_code: appcode,
        is_all: is_all,
      },
    });
    return res as Settings;
  }

  async deleteSetting(id: number) {
    await this.prismaService.settings.update({
      data: {
        is_active: false,
        values: {
          updateMany: {
            data: {
              is_active: false,
            },
            where: {
              setting_id: id,
            },
          },
        },
      },
      where: {
        id: id,
      },
    });
    return true;
  }
}
