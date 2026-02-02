import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class ChatMessageInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  text: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(2, 63)
  chatRoomId: string;
}
