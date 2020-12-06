import {
  Resolver,
  ResolveField,
  Query,
  Mutation,
  Parent,
  Args,
} from '@nestjs/graphql';

import { UserService } from './../services/user.service';
import { User } from '../schemas/user.schema';
import { Hobby, HobbyDocument } from '../schemas/hobby.schema';
import { CreateHobbyInput } from '../typeDefs/hobby.dto';
import { HobbyService } from './../services/hobby.service';
import { FindUsersInput } from '../typeDefs/user.dto';

@Resolver(() => Hobby)
export class HobbyResolver {
  constructor(
    private readonly hobbyService: HobbyService,
    private readonly userService: UserService,
  ) { }

  /**
   * Query
   */
  @Query(() => [Hobby])
  async hobbies(): Promise<Hobby[]> {
    const hobbies = this.hobbyService.findAll();

    return hobbies;
  }

  /**
   * Mutation
   */
  @Mutation(() => Hobby)
  async createHobby(
    @Args('input') input: CreateHobbyInput,
  ): Promise<Hobby> {
    const hobby = await this.hobbyService.create(input);

    return hobby;
  }

  @Mutation(() => Hobby, { nullable: true })
  async deleteHobby(
    @Args('id') id: String,
  ): Promise<Hobby | undefined> {
    const hobby = await this.hobbyService.delete(id);

    return hobby;
  }

  /**
   * Sub Fields Resolver
   */
  @ResolveField(() => [User], {nullable: true})
  async users(@Parent() hobby: HobbyDocument) {
    const input = { hobbies: { in: [hobby._id] } } as FindUsersInput;
    const users = await this.userService.findAll(input) || [];

    return users;
  }
}
