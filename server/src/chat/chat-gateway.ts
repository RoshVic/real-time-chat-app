import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

import { ChatService } from './chat.service';
import { JwtPayload } from 'src/auth/interfaces/jwt.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway(3001, {
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    client.emit('chat:room', true);

    console.log('User connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    client.emit('chat:room', false);

    console.log('User disconnected:', client.id);
  }

  @SubscribeMessage('chat:connection')
  async handleJoinRoom(
    @MessageBody()
    message: {
      accessToken: string;
      chatId: string;
      connection: boolean;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { accessToken, chatId, connection } = message;

    const payload: JwtPayload = await this.jwtService.verifyAsync(accessToken);

    if (payload) {
      const user = await this.authService.validate(payload.id);

      if (connection) {
        await client.join(chatId);

        client.broadcast.to(chatId).emit(`chat:receiveMessage`, {
          text: `User ${user.username} joined the chat`,
        });

        console.log(`User ${user.username} joined room ${chatId}`);
      } else {
        client.broadcast.to(chatId).emit(`chat:receiveMessage`, {
          text: `User ${user.username} left the chat`,
        });

        await client.leave(chatId);

        console.log(`User ${user.username} left room ${chatId}`);
      }
    }
  }

  @SubscribeMessage('chat:sendMessage')
  async handleNewMessage(
    @MessageBody()
    message: {
      accessToken: string;
      chatId: string;
      text: string;
    },
  ) {
    const { accessToken, chatId, text } = message;

    const payload: JwtPayload = await this.jwtService.verifyAsync(accessToken);

    if (payload) {
      const user = await this.authService.validate(payload.id);

      const newMessage = await this.chatService.addMessage(user.id, {
        text,
        chatRoomId: chatId,
      });

      this.server.to(chatId).emit('chat:receiveMessage', newMessage);
    }
  }
}
