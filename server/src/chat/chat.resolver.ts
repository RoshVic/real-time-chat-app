import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { type User } from '@prisma/client';

import { ChatService } from './chat.service';
import { ChatMessageModel } from './models/chat-message.model';
import { ChatMessageInput } from './inputs/chat-message.input';
import { Authorized } from 'src/auth/decorators/authorized.guard';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { ChatRoomInput } from './inputs/chat-room.input';
import { ChatRoomModel } from './models/chat-room.model';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Authorization()
  @Mutation(() => ChatMessageModel)
  async addMessage(
    @Authorized() user: User,
    @Args('data') input: ChatMessageInput,
  ) {
    return this.chatService.addMessage(user.id, input);
  }

  @Authorization()
  @Query(() => [ChatRoomModel])
  async getChatRooms(@Authorized() user: User) {
    return this.chatService.getChatRooms(user.id);
  }

  @Authorization()
  @Mutation(() => ChatRoomModel)
  async createChatRoom(
    @Authorized() user: User,
    @Args('data') input: ChatRoomInput,
  ) {
    return this.chatService.createChatRoom(user.id, input);
  }
}
