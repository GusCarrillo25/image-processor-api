import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/services/images.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RepositoryService } from 'src/services/repository.service';

@UseGuards(JwtAuthGuard)
@Controller('images')
export class ImagesController {
  constructor(
    private readonly imageService: ImagesService,
    private readonly repository: RepositoryService,
  ) {}

  @Post('greyscale')
  @UseInterceptors(FileInterceptor('image'))
  greyscale(@UploadedFile() file) {
    return this.imageService.greyscale(file.buffer as Buffer);
  }

  @Post('resize')
  @UseInterceptors(FileInterceptor('image'))
  resize(@UploadedFile() file) {
    return this.imageService.resize(file.buffer as Buffer);
  }

  @Get('all')
  async getAllImages(): Promise<any[]> {
    const images = await this.repository.getAllProcessedImages();
    return images;
  }

  @Get(':id')
  async getImage(@Param('id') id: string) {
    const file = await this.repository.getById(Number(id));
    return new StreamableFile(file.imageData, {
      disposition: `attachment; filename=${file.imageName}`,
    });
  }
}
