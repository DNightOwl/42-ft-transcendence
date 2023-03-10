import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as cookieParser from 'cookie-parser';
import { populateDB } from 'prisma/db.seed';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: "http://"+configService.get('DOMAIN')+":3001",
    credentials: true,
  })
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
  await populateDB();
}
bootstrap();
