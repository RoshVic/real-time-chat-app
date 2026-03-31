import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { type User } from '@prisma/client';

import { ChatService } from './chat.service';
import { Authorized } from 'src/auth/decorators/authorized.guard';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { ChatRoomInput } from './inputs/chat-room.input';
import { ChatRoomModel } from './models/chat-room.model';
import { ChatMessageModel } from './models/chat-message.model';
import { GetChatMessagesInput } from './inputs/get-chat-messages.input';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

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

  @Authorization()
  @Query(() => [ChatMessageModel])
  async getMessages(
    @Authorized() user: User,
    @Args('data') input: GetChatMessagesInput,
  ) {
    return this.chatService.getMessages(user.id, input);
  }
}
