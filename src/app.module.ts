import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { ImagesService } from './services/images.service';
import { ImagesController } from './controllers/images.controller';
import { PrismaService } from './services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from './config/config';
import { RepositoryService } from './services/repository.service';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
  ],
  controllers: [AuthController, ImagesController],
  providers: [ImagesService, PrismaService, AuthService, RepositoryService],
  exports: [AuthService],
})
export class AppModule {}
