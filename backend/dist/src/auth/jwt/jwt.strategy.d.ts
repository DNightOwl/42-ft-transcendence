import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { jwtPayload } from "../dto/types";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    private static extractJWT;
    validate(payload: jwtPayload): Promise<import(".prisma/client").user>;
}
export {};
