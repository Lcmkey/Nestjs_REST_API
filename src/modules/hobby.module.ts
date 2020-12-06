import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Hobby, HobbySchema } from '../schemas/hobby.schema';
import { HobbyService } from './../services/hobby.service';
import { HobbyResolver } from './../resolvers/hobby.resolver';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hobby.name, schema: HobbySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [HobbyResolver, HobbyService, UserService],
  // providers: [HobbyResolver, HobbyService],
})

export class HobbyModule {}
