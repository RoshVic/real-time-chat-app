import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import type { Request, Response } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/auth/interfaces/jwt.interface';
import { ChatMessageInput } from './inputs/chat-message.input';

@Injectable()
export class ChatService {
  private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
  private readonly JWT_REFRESH_TOKEN_TTL: StringValue;

  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_REFRESH_TOKEN_TTL',
    );

    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async addMessage(req: Request, input: ChatMessageInput) {
    const { message } = input;

    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      throw new UnauthorizedException('Unauthorized');
    }

    const accessToken = authHeaders.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(accessToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newMessage = await this.prismaService.chatMessage.create({
        data: {
          message: message,
          userId: user.id,
          chatRoomId: '1234', // temp
        },
      });

      return { message };
    }
  }
}
