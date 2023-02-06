import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { user } from '@prisma/client';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly configService;
    constructor(prisma: PrismaService, jwt: JwtService, configService: ConfigService);
    handleUser(user: AuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response, login: string): Promise<Response<any, Record<string, any>>>;
    refreshtoken(user: user, res: Response): Promise<string>;
    refreshCookie(token: string, tokenName: string, res: Response): Promise<void>;
    createUserIfNotExist(intraUser: AuthDto): Promise<user>;
    updateRefreshToken(login: string, refreshToken: string): Promise<user>;
    generateTokens(user: user, type: string): Promise<string>;
}
