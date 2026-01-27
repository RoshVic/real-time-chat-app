import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ChatGateway } from './chat-gateway';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [ChatService, ChatResolver, ChatGateway],
})
export class ChatModule {}
