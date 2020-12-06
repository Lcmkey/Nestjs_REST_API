import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHobbyInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}