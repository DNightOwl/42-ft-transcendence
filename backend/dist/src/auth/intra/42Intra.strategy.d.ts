import { Profile } from "passport";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
declare const IntraStrategy_base: new (...args: any[]) => import("passport-oauth2");
export declare class IntraStrategy extends IntraStrategy_base {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    validate(accessToken: string, _refreshToken: string, _profile: Profile): Promise<any>;
}
export {};
