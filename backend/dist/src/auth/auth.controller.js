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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const _2FA_service_1 = require("./2FA/2FA.service");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./intra/auth.guard");
const jwt_guard_1 = require("./jwt/jwt.guard");
const refresh_guard_1 = require("./jwt/refresh.guard");
let AuthController = class AuthController {
    constructor(authService, tfa) {
        this.authService = authService;
        this.tfa = tfa;
    }
    handleLogin() { }
    handleRedirect(req, res) {
        const user = req.user;
        return this.authService.handleUser(user, res);
    }
    refreshToken(req, res) {
        const user = req.user;
        return this.authService.refreshtoken(user, res);
    }
    logout(res, req) {
        const user = req.user;
        return this.authService.logout(res, user.login);
    }
    generateQR(req) {
        const user = req.user;
        return this.tfa.generateQR(user);
    }
    async enableTFA(code, req) {
        const isValid = await this.tfa.verifyTfaCode(code, req.user);
        if (isValid === true)
            this.tfa.tfaActivation(true, req.user);
        return isValid;
    }
    async disableTFA(code, req) {
        const isValid = await this.tfa.verifyTfaCode(code, req.user);
        if (isValid === true)
            this.tfa.tfaActivation(false, req.user);
        return isValid;
    }
    async signinTfaVerification(code, req, res) {
        const isValid = await this.tfa.verifyTfaCode(code, req.user);
        if (isValid === true) {
            const refreshToken = await this.authService.generateTokens(req.user, "refresh");
            await this.authService.updateRefreshToken(req.user.login, refreshToken);
            await this.authService.refreshCookie(refreshToken, 'token', res);
            return { msg: "tfa is valid" };
        }
        return { msg: "tfa not valid" };
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.IntraAuthGuard),
    (0, common_1.Get)('42intra/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.IntraAuthGuard),
    (0, common_1.Get)('42intra/redirect'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleRedirect", null);
__decorate([
    (0, common_1.UseGuards)(refresh_guard_1.RefreshGuard),
    (0, common_1.Get)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('generateqr'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "generateQR", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('enabletfa'),
    __param(0, (0, common_1.Body)('code')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "enableTFA", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('disabletfa'),
    __param(0, (0, common_1.Body)('code')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "disableTFA", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('tfaverification'),
    __param(0, (0, common_1.Body)('code')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinTfaVerification", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, _2FA_service_1.TFAService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map