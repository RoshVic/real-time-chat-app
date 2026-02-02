import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatRoomModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  roomname: string;

  @Field(() => String)
  createdAt: Date;
}
