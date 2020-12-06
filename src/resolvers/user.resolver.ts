import {
  Resolver,
  ResolveField,
  Query,
  Mutation,
  Subscription,
  Parent,
  Args,
} from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";

import { UserService } from "./../services/user.service";
import {
  UserSortingField,
  PaginationInput,
  CreateUserInput,
  UpdateUserInput,
  FindUsersInput,
  FindUserInput,
  ChangePasswordInput,
} from "./../typeDefs/user.dto";
import { User, UserDocument } from "../schemas/user.schema";

import { Hobby } from "../schemas/hobby.schema";

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Number, { nullable: true })
  async totalUsers(
    @Args({ name: "input", nullable: true, type: () => FindUsersInput })
    input?: FindUsersInput,
  ): Promise<number | null> {
    const item = await this.userService.totalUsers(input);

    return item;
  }

  @Query(() => [User])
  async users(
    @Args({ name: "input", nullable: true, type: () => FindUsersInput })
    input?: FindUsersInput,

    @Args({ name: "pagination", nullable: true })
    pagination?: PaginationInput,
    
    @Args({ name: "sort", nullable: true })
    sort?: UserSortingField,
  ): Promise<User[]> {
    const users = this.userService.findAll(input, sort, pagination);

    return users;
  }

  @Query(() => User, { nullable: true })
  async user(
    @Args("input", { type: () => FindUserInput })
    input: FindUserInput,
  ): Promise<User | null> {
    const user = await this.userService.findOne(input);

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: "input", type: () => CreateUserInput })
    input: CreateUserInput,
  ): Promise<User> {
    const user = await this.userService.create(input);

    pubSub.publish("userAdded", user);

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args({ name: "id", type: () => String })
    id: string,

    @Args({ name: "input", type: () => UpdateUserInput })
    input: UpdateUserInput,
  ): Promise<User> {
    const user = this.userService.update(id, input);

    return user;
  }

  @Mutation(() => User)
  async changePassword(
    @Args({ name: "input", type: () => ChangePasswordInput })
    input: ChangePasswordInput,
  ): Promise<User> {
    const user = this.userService.changePassword(input);

    return user;
  }

  /**
   * Sub Fields Resolvers
   */
  @ResolveField(() => Date)
  async createdAt(
    @Parent() user: UserDocument,
    @Args("format", { nullable: true, type: () => String })
    format: String,
  ) {
    return user.createdAt;
  }

  @ResolveField(() => Date)
  async updatedAt(
    @Parent() user: UserDocument,
    @Args("format", { nullable: true, type: () => String })
    format: String,
  ) {
    return user.updatedAt;
  }

  @ResolveField(() => [Hobby])
  async hobbies(
    @Parent() user: UserDocument,
    @Args("populate", { nullable: true, type: () => Boolean })
    populate: Boolean,
  ) {
    if(populate){
      await user.populate({ path: "hobbies", model: Hobby.name }).execPopulate();
    }

    return user.hobbies;
  }

  /**
   * Subs
   */
  @Subscription((returns) => User, {
    name: "userAdded",
    resolve: (value) => value,
    nullable: true,
  })
  userAdded() {
    return pubSub.asyncIterator("userAdded");
  }
}
