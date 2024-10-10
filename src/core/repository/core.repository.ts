import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CoreRepository {
  constructor(private prismaService: PrismaService) {}

  async options() {
    return await this.prismaService.settings.findMany({
      orderBy: {
        key: 'desc',
      },
      where: {
        is_active: true,
      },
    });
  }

  async setting(key: string) {
    return await this.prismaService.settings.findFirst({
      where: {
        key: key,
        is_active: true,
      },
      include: {
        values: true,
      },
    });
  }

  async findSettingByAppCodeAndKey(appcode: string, key: string) {
    return await this.prismaService.settings.findFirst({
      where: {
        key: key,
        app_code: appcode,
        is_active: true,
      },
      include: {
        values: true,
      },
    });
  }

  async create(key: string, value: string, appcode: string, is_all: boolean) {
    return await this.prismaService.settings.create({
      data: {
        key: key,
        app_code: appcode,
        values: {
          create: {
            value: value,
          },
        },
        is_all: is_all,
      },
    });
  }

  async updateValue(id: number, value: string) {
    return await this.prismaService.values.update({
      where: {
        id: id,
      },
      data: {
        value: value,
      },
    });
  }

  async deleteValue(id: number) {
    return await this.prismaService.values.update({
      data: {
        is_active: false,
      },
      where: {
        id: id,
      },
    });
  }

  async updateSetting(
    id: number,
    key: string,
    appcode: string,
    is_all: boolean,
  ) {
    return await this.prismaService.settings.update({
      where: {
        id: id,
      },
      data: {
        key: key,
        app_code: appcode,
        is_all: is_all,
      },
    });
  }

  async deleteSetting(id: number) {
    return await this.prismaService.settings.update({
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
  }
}
