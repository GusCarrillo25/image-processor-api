import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Images_db } from '@prisma/client';
import { APP_CONFIG } from 'src/config/config';

@Injectable()
export class RepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data): Promise<Partial<Images_db>> {
    try {
      const savedImage = await this.prisma.images_db.create({
        data,
      });

      const url = `${APP_CONFIG.host}${savedImage.id}`;
      await this.updateImageUrl(url, savedImage.id);
      return {
        id: savedImage.id,
        imageName: savedImage.imageName,
        url,
      };
    } catch (e) {
      console.error(e.message);
      throw new InternalServerErrorException('Unable to upload!');
    }
  }
  async getAllProcessedImages(): Promise<Images_db[]> {
    // Endpoint to get all the processed images inside the database
    return await this.prisma.images_db.findMany();
  }

  async getById(id: number): Promise<Partial<Images_db>> {
    return this.prisma.images_db.findUnique({
      select: {
        imageData: true,
        imageName: true,
      },
      where: { id },
    });
  }
  private async updateImageUrl(url: string, id: number): Promise<void> {
    this.prisma.images_db.update({
      data: {
        url,
      },
      where: {
        id,
      },
    });
  }
}
