import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi'
import { RoomModule } from './chat/rooms/room.modules';
import { AchievementsModule } from './achievements/achievements.module'; //TODO : to be added to the game module


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    RoomModule,
    AchievementsModule, //TODO : to be added to the game module
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        AUTHORIZATION_URL: Joi.string().required(),
        TOKEN_URL: Joi.string().required(),
        CLIENT_ID: Joi.string().required(),
        CLIENT_SECRET: Joi.string().required(),
        CALLBACK_URL: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      })
    }),
  ],
})
export class AppModule {}