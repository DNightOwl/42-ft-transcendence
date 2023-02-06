"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const Joi = require("joi");
const room_modules_1 = require("./chat/rooms/room.modules");
const achievements_module_1 = require("./achievements/achievements.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            room_modules_1.RoomModule,
            achievements_module_1.AchievementsModule,
            config_1.ConfigModule.forRoot({
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
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map