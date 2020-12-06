import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Directive, Field, ObjectType, HideField, ID } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import {
  Max,
  Min,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
  IsDate,
  Matches
} from 'class-validator';

import { Hobby } from './hobby.schema';

import { usernamaeRegx } from "../utils/input-regx.util";

/**
 * Model && Schema
 */
@ObjectType()
@Schema()
export class User {
  @Field((type) => ID, { name: 'id', description: 'Record unique ID' })
  _id?: Types.ObjectId;

  @Field(() => String, { description: 'User Name' })
  @Prop({ type: String, required: true, match: usernamaeRegx.rule, trim: true })
  @IsString()
  @IsNotEmpty()
  @Directive('@upper')
  readonly username: string;

  @Field(() => String, { description: 'Email Address' })
  @Prop({ type: String, required: true, unique: true })
  @IsString()
  readonly email: string;

  @HideField()
  @Prop({ type: String, required: true })
  @IsString()
  password: string;

  @Field(() => String, { description: 'A: Active, S: Suspend' })
  @Prop({ type: String, maxlength: 1, default: "A", enum: ["A", "S"], uppercase: true })
  @IsString()
  @MaxLength(1)
  readonly status: string;

  @Field(() => Date, { description: 'Record Creation Date' })
  @Prop({ type: Date, default: new Date() })
  @IsDate()
  @Directive('@datetime(defaultFormat: "HH:MM:ss dd/mm/yyyy")')
  createdAt: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'Record Last Updated Date',
  })
  @Prop({ type: Date })
  @IsOptional()
  @IsDate()
  @Directive('@datetime(defaultFormat: "HH:MM:ss dd/mm/yyyy")')
  updatedAt: Date;

  @Field(() => [Hobby], { description: 'User Hobbies ID List', nullable: true })
  @Prop({ type: [Types.ObjectId], ref: Hobby.name })
  readonly hobbies?: Hobby[] = []
  // hobbies:  Types.ObjectId[] | Hobby[];

  @Field(() => String, { description: 'Virtual Type' })
  hello: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

/**
 * VirtualType
 */
UserSchema.virtual('hello').get(() => {
  return 'world';
});
