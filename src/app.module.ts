import { Module, CacheModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

import { UpperCaseDirective } from "./common/directives/upper-case.directive";
import { FormattableDateDirective } from "./common/directives/formattable-date.directive";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { CacheService } from './config/cache.config'

import { CommonModule } from "./common/common.module";
import { UserModule } from "./modules/user.module";
import { HobbyModule } from "./modules/hobby.module";

const { MONGO_URL = "" } = process.env;

const controllers = [AppController];
const providers = [AppService];

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), "graphql/schema.gql"),
      debug: false,
      sortSchema: true,
      // playground: false,
      playground: {
        workspaceName: "GRAPHQL CQRS",
        settings: {
          "editor.theme": "dark",
        },
      },
      schemaDirectives: {
        upper: UpperCaseDirective,
        datetime: FormattableDateDirective,
      },
    }),
		CacheModule.registerAsync({
			useClass: CacheService
		}),
    CommonModule,
    UserModule,
    HobbyModule,
    // ItemsModule,
    // RoleModule,
    MongooseModule.forRoot(MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }),
  ],
  controllers,
  providers,
})
export class AppModule { }
