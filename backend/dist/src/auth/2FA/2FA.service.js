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
exports.TFAService = void 0;
const qrcode = require("qrcode");
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const prisma_service_1 = require("../../prisma/prisma.service");
let TFAService = class TFAService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateQR(user) {
        const secret = otplib_1.authenticator.generateSecret();
        const otpauth = otplib_1.authenticator.keyuri(user.login, 'ft_transcendence', secret);
        const qrpath = await qrcode.toDataURL(otpauth);
        await this.prisma.user.update({
            where: {
                login: user.login,
            },
            data: {
                two_fa_secret: secret,
            }
        });
        return qrpath;
    }
    async verifyTfaCode(code, user) {
        const secret = user.two_fa_secret;
        if (secret && code)
            return otplib_1.authenticator.check(code, secret);
        return false;
    }
    async tfaActivation(enabled, user) {
        if (enabled === true) {
            await this.prisma.user.update({
                where: {
                    login: user.login,
                },
                data: {
                    two_fa_enabled: true,
                }
            });
        }
        else {
            await this.prisma.user.update({
                where: {
                    login: user.login,
                },
                data: {
                    two_fa_enabled: false,
                    two_fa_secret: null,
                }
            });
        }
    }
};
TFAService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TFAService);
exports.TFAService = TFAService;
//# sourceMappingURL=2FA.service.js.map