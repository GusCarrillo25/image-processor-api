import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Images_db } from '@prisma/client';
import { Jimp } from 'jimp';
import { RepositoryService } from './repository.service';

@Injectable()
export class ImagesService {
  constructor(private readonly repository: RepositoryService) {}

  async greyscale(bufferImage: Buffer): Promise<Partial<Images_db>> {
    // Endpoint to convert image on grey scale
    const data = {
      imageData: undefined,
      imageName: '',
      type: '',
      url: '',
    };
    try {
      const image = await Jimp.read(bufferImage);
      image.greyscale();

      data.imageData = await image.getBuffer('image/png');
      data.type = 'Grey Scale';
      data.imageName = `greyscale_${Date.now()}.png`;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException("Can't convert to grey scale");
    }

    return this.repository.create(data);
  }

  async resize(bufferImage: Buffer): Promise<Partial<Images_db>> {
    // Endpoint to resize an image into w: 300 and h: 250
    const data = {
      imageData: undefined,
      imageName: '',
      type: '',
      url: '',
    };
    try {
      const image = await Jimp.read(bufferImage);
      image.resize({ w: 300, h: 250 });

      data.imageData = await image.getBuffer('image/png');
      data.type = 'Resize';
      data.imageName = `resize_${Date.now()}.png`;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException("Can't resize");
    }

    return this.repository.create(data);
  }
}
