import { registerEnumType } from '@nestjs/graphql';
import {
    Directive,
    ObjectType,
    InputType,
    ArgsType,
    Field,
    ID,
    Int,
    HideField,
  } from '@nestjs/graphql';

/**
 * Enum Type
 */
enum Status {
  A = 'A',
  S = 'S',
}

// enum Dire {
//   ASC = 1,
//   DESC = -1,
// }

registerEnumType(Status, {
  name: 'Status',
});

@InputType()
export class Test {
  @Field(() => String, { nullable: true })
  test?: string;
}