import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<any> {
    console.log(email, password);

    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });
    if (user) {
      throw new BadRequestException('This user already exist!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.users.create({
      data: {
        email: email,
        passworrd: hashedPassword,
      },
    });

    return newUser;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Email, please check and try again');
    }

    const passwordMatch = await bcrypt.compare(password, user.passworrd);
    if (!passwordMatch) {
      throw new BadRequestException('Password incorrect, please try again');
    }

    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
