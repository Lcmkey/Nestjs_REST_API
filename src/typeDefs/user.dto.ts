import {
	Directive,
	ObjectType,
	InputType,
	ArgsType,
	Field,
	ID,
	Int,
	HideField
} from '@nestjs/graphql';
import {
	Max,
	Min,
	IsOptional,
	IsString,
	IsNotEmpty,
	IsNumber,
	IsDate,
	IsEnum,
	Length,
	MaxLength,
	IsEmail,
	IsArray,
	Matches
} from 'class-validator';
import { registerEnumType } from '@nestjs/graphql';

import { Hobby } from '../schemas/hobby.schema';
import { usernamaeRegx, passwordRegx } from '../utils/input-regx.util';

/**
 * Enum Type
 */
enum UserStatus {
	A = 'A',
	S = 'S'
}

enum UserFields {
	email = 'email',
	username = 'username',
	status = 'status',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt'
}

enum Dire {
	ASC = 1,
	DESC = -1
}

registerEnumType(UserFields, {
	name: 'UserFields'
})

registerEnumType(Dire, {
	name: 'Dire'
})

registerEnumType(UserStatus, {
	name: 'UserStatus'
})

/**
 * Input Type
 */
@InputType()
export class CreateUserInput {
	readonly createdAt: Date = new Date()

	@Field(() => String)
	@Length(8, 20)
	@Matches(usernamaeRegx.rule, { message: usernamaeRegx.msg })
	username: string

	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => String)
	@Length(8, 32)
	@Matches(passwordRegx.rule, { message: passwordRegx.msg })
	password: string

	@Field(() => String)
	@Length(8, 32)
	@Matches(passwordRegx.rule, { message: passwordRegx.msg })
	passwordCfm: string

	@Field(() => UserStatus, { nullable: true })
	@IsOptional()
	@MaxLength(1)
	@IsEnum(UserStatus)
	status?: string = UserStatus.A

	@Field(() => [String])
	@IsArray()
	hobbies?: Hobby[] = []
}

@InputType()
export class UpdateUserInput {
	@Field(() => String)
	@Length(8, 20)
	username: string

	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => UserStatus, { nullable: true })
	@IsOptional()
	@MaxLength(1)
	@IsEnum(UserStatus)
	status?: string = UserStatus.A

	@Field(() => [String])
	@IsArray()
	hobbies?: Hobby[]
	//   hobbies: Array<string>
}

@InputType()
export class ChangePasswordInput {
	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => String)
	@Length(8, 32)
	@Matches(passwordRegx.rule, { message: passwordRegx.msg })
	password: string

	@Field(() => String)
	@Length(8, 32)
	@Matches(passwordRegx.rule, { message: passwordRegx.msg })
	passwordCfm: string
}

@InputType()
export class UserNameInput {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString()
	eq: string
}

@InputType()
export class EmailInput {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsEmail()
	eq: string
}

@InputType()
export class UserHobbiesInput {
	@Field(() => [String], { nullable: true })
	@IsOptional()
	@IsArray()
	in: string[]

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString()
	eq: string
}

@InputType()
export class FindUsersInput {
	@Field(() => UserNameInput, { nullable: true })
	username?: UserNameInput

	@Field(() => EmailInput, { nullable: true })
	email?: EmailInput

	@Field(() => UserHobbiesInput, { nullable: true })
	hobbies?: UserHobbiesInput
}

@InputType()
export class FindUserInput {
	@Field(() => EmailInput, { nullable: true })
	email?: EmailInput
}

// @ArgsType
@InputType()
export class PaginationInput {
	@Field((type) => Int)
	@Min(0)
	skip = 0

	@Field((type) => Int)
	@Min(1)
	@Max(50)
	limit = 10
}

@InputType()
export class UserSortingField {
	@Field((type) => UserFields)
	field = 'createdAt'

	@Field((type) => Dire)
	dire = -1
}
