import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(6, 128)
  password: string;
}
