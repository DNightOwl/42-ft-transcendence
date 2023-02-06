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
exports.RefreshGuard = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RefreshGuard = class RefreshGuard {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const refreshToken = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!refreshToken)
            return false;
        const user = await this.prisma.user.findFirst({ where: { rToken: refreshToken } });
        if (!user)
            return false;
        request.user = user;
        return true;
    }
};
RefreshGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RefreshGuard);
exports.RefreshGuard = RefreshGuard;
//# sourceMappingURL=refresh.guard.js.map