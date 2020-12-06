require('dotenv').config({ path: `.env` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

declare const module: any;
const { PORT = 4000 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  
  /**
   * Run in docker env that need to add IP
   */
  // await app.listen(PORT, "0.0.0.0");

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  Logger.log(`🚀 Server running on http://localhost:${PORT}`, 'Bootstrap');
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
