import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import type { GqlContext } from 'src/common/interfaces/gql-context.inteface';
import { ChatService } from './chat.service';
import { ChatMessageModel } from './models/chat-message.model';
import { ChatMessageInput } from './inputs/chat-message.input';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => ChatMessageModel)
  async addMessage(
    @Context() { req }: GqlContext,
    @Args('data') input: ChatMessageInput,
  ) {
    return this.chatService.addMessage(req, input);
  }

  //   @Mutation(() => AuthModel)
  //   async login(@Context() { res }: GqlContext, @Args('data') input: LoginInput) {
  //     return this.authService.login(res, input);
  //   }

  //   @Mutation(() => AuthModel)
  //   async refresh(@Context() { req, res }: GqlContext) {
  //     return this.authService.refresh(req, res);
  //   }

  //   @Mutation(() => Boolean)
  //   async logout(@Context() { res }: GqlContext) {
  //     return this.authService.logout(res);
  //   }
}
