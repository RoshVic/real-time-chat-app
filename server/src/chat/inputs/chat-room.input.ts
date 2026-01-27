import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class ChatRoomInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(2, 32)
  roomname: string;
}
