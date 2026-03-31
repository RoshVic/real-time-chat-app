import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class GetChatMessagesInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(2, 63)
  chatRoomId: string;
}
