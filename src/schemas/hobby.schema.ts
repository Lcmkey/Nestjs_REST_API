import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Directive, Field, ObjectType, ID } from "@nestjs/graphql";
import { Document, Types } from "mongoose";
import { IsString, IsNotEmpty, IsOptional, IsDate } from "class-validator";

import { User } from "./user.schema";
import { hobbyNameRegx } from "./../utils/input-regx.util";

/**
 * Model && Schema
 */
@ObjectType()
@Schema()
export class Hobby {
    @Field((type) => ID, { name: 'id', description: 'Record unique ID' })
    _id?: Types.ObjectId;

    @Field(() => String, { nullable: true, description: "Hobby Name" })
    @Prop({ type: String, required: true, unique: true, match: hobbyNameRegx.rule, trim: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @Field(() => String, { nullable: true, description: "Hobby Description" })
    @Prop({ type: String })
    @IsString()
    readonly description: string;

    @Field(() => Date, { nullable: true, description: "Record Creation Date" })
    @Prop({ type: Date, default: new Date() })
    @IsDate()
    @Directive('@datetime(defaultFormat: "HH:MM:ss dd/mm/yyyy")')
    createdAt: Date;

    @Field(() => Date, { nullable: true, description: "Record Last Updated Date" })
    @Prop({ type: Date })
    @IsOptional()
    @IsDate()
    @Directive('@datetime(defaultFormat: "HH:MM:ss dd/mm/yyyy")')
    updatedAt?: Date

    @Field(() => [User], { nullable: true })
    readonly users?: User[] = [];
}

export type HobbyDocument = Hobby & Document;

export const HobbySchema = SchemaFactory.createForClass(Hobby);