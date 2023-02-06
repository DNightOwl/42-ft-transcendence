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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, configService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.configService = configService;
    }
    async handleUser(user, res) {
        let userData = await this.createUserIfNotExist(user);
        const refreshToken = await this.generateTokens(userData, "refresh");
        if (!refreshToken) {
            throw new common_1.ForbiddenException('');
        }
        if (userData.two_fa_enabled === false) {
            userData = await this.updateRefreshToken(userData.login, refreshToken);
        }
        await this.refreshCookie(refreshToken, 'token', res);
        if (userData.two_fa_enabled === true) {
            return res.send({ message: '2FA is activated verify code' });
        }
        return res.send({ message: 'Logged in succefully', user: userData });
    }
    async logout(res, login) {
        await this.prisma.user.updateMany({
            where: {
                login: login,
                rToken: {
                    not: null
                }
            },
            data: {
                rToken: null
            }
        });
        res.clearCookie('token');
        res.clearCookie('accessToken');
        return res.send({ msg: "done" });
    }
    async refreshtoken(user, res) {
        const accessToken = await this.generateTokens(user, "access");
        if (!accessToken) {
            throw new common_1.ForbiddenException('');
        }
        await this.refreshCookie(accessToken, 'accessToken', res);
        return 'new_access_token';
    }
    async refreshCookie(token, tokenName, res) {
        const decoded_token = this.jwt.decode(token);
        const expr_duration = (decoded_token.exp - decoded_token.iat) * 1000;
        res.cookie(tokenName, token, { maxAge: expr_duration, httpOnly: true });
    }
    async createUserIfNotExist(intraUser) {
        const login = intraUser.login;
        const user = await this.prisma.user.upsert({
            where: {
                login: intraUser.login,
            },
            update: {},
            create: {
                email: intraUser.email,
                login: intraUser.login,
                nickname: intraUser.login,
            },
        });
        return user;
    }
    async updateRefreshToken(login, refreshToken) {
        return await this.prisma.user.update({
            where: {
                login: login
            },
            data: {
                rToken: refreshToken,
            }
        });
    }
    async generateTokens(user, type) {
        let secret = "";
        let expiresIn = "";
        if (type === "refresh") {
            secret = this.configService.get('REFRESH_TOKEN_SECRET');
            expiresIn = this.configService.get('REFRESH_TOKEN_EXPIRATION');
        }
        else if (type === "access") {
            secret = this.configService.get('ACCESS_TOKEN_SECRET'),
                expiresIn = this.configService.get('ACCESS_TOKEN_EXPIRATION');
        }
        const refreshToken = await this.jwt.signAsync({
            email: user.email,
            login: user.login
        }, {
            secret: secret,
            expiresIn: expiresIn
        });
        return refreshToken;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService, config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map