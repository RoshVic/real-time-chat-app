import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatMessageModel {
  @Field(() => String)
  message: String;

  @Field(() => String)
  username: String;
}
