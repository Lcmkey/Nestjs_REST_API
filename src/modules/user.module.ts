import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from './../services/user.service';
import { UserResolver } from './../resolvers/user.resolver';
import { DateScalar } from '../common/scalars/date.scalar';

// @Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserResolver, UserService, DateScalar],
    exports: [UserService]
})

export class UserModule { }
