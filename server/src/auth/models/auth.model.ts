import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
  @Field(() => String)
  accessToken: String;

  @Field(() => String)
  username: String;
}
