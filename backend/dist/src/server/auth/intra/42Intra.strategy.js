"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntraStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_oauth2_1 = require("passport-oauth2");
const axios_1 = require("axios");
const prisma_service_1 = require("../../prisma/prisma.service");
const config_1 = require("@nestjs/config");
let IntraStrategy = class IntraStrategy extends (0, passport_1.PassportStrategy)(passport_oauth2_1.Strategy, 'intra') {
    constructor(prisma, configService) {
        super({
            authorizationURL: configService.get('AUTHORIZATION_URL'),
            tokenURL: configService.get('TOKEN_URL'),
            clientID: configService.get('CLIENT_ID'),
            clientSecret: configService.get('CLIENT_SECRET'),
            callbackURL: configService.get('CALLBACK_URL'),
        });
        this.prisma = prisma;
        this.configService = configService;
    }
    async validate(accessToken, _refreshToken, _profile) {
        const intraUser = await (0, axios_1.default)({
            method: 'GET',
            url: 'https://api.intra.42.fr/v2/me',
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => res.data);
        return intraUser;
    }
};
IntraStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], IntraStrategy);
exports.IntraStrategy = IntraStrategy;
//# sourceMappingURL=42Intra.strategy.js.map