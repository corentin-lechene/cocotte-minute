import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ApiKeyGuard} from "./recipe/infrastructure/nest/guards/api-key.guard";
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register({ driver: 'orm' }));
  app.useGlobalGuards(new ApiKeyGuard());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
