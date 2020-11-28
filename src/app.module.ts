import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

const { MONGO_URL = "" } = process.env;

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
