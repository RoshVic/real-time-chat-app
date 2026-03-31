import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ChatMessageInput } from './inputs/chat-message.input';
import { ChatRoomInput } from './inputs/chat-room.input';
import { GetChatMessagesInput } from './inputs/get-chat-messages.input';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessages(userId: string, input: GetChatMessagesInput) {
    const { chatRoomId } = input;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const chatRoom = await this.prismaService.chatRoom.findUnique({
      where: { id: chatRoomId },
    });

    if (!chatRoom) {
      throw new NotFoundException('Chat room not found');
    }

    const messages = await this.prismaService.chatMessage.findMany({
      where: { chatRoomId },
      include: {
        user: {
          select: { username: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return messages.map((msg) => ({
      id: msg.id,
      text: msg.text,
      username: msg.user.username,
      createdAt: msg.createdAt,
    }));
  }

  async addMessage(userId: string, input: ChatMessageInput) {
    const { text, chatRoomId } = input;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const chatRoom = await this.prismaService.chatRoom.findUnique({
      where: { id: chatRoomId },
      select: {
        id: true,
      },
    });

    if (!chatRoom) {
      throw new NotFoundException('Chat room not found');
    }

    const newMessage = await this.prismaService.chatMessage.create({
      data: {
        text,
        userId: user.id,
        chatRoomId: chatRoom.id,
      },
    });

    return {
      id: newMessage.id,
      text: newMessage.text,
      username: user.username,
      createdAt: newMessage.createdAt,
    };
  }

  async getChatRooms(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        chatRooms: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const chatRooms = await this.prismaService.chatRoom.findMany();

    return chatRooms;
  }

  async createChatRoom(userId: string, input: ChatRoomInput) {
    const { roomname } = input;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const chatRoom = await this.prismaService.chatRoom.create({
      data: {
        roomname,
        ownerId: user.id,
        users: {
          connect: { id: user.id },
        },
      },
    });

    return {
      id: chatRoom.id,
      roomname: chatRoom.roomname,
      createdAt: chatRoom.createdAt,
    };
  }
}
