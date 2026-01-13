import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('User connected:', client.id);

    client.broadcast.emit('user-connect', {
      message: `User joined the chat: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected:', client.id);

    this.server.emit('user-disconnect', {
      message: `User left the chat: ${client.id}`,
    });
  }

  @SubscribeMessage('foo-message')
  handleNewMessage(@MessageBody() message: string) {
    console.log(message);
    this.server.emit('foo-message', message);
  }
}
