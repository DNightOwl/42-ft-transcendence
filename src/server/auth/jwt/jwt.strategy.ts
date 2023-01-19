import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/server/prisma/prisma.service";
import { jwtPayload } from "../dto/types";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private configService: ConfigService,private prisma: PrismaService) {
		super({
			jwtFromRequest : ExtractJwt.fromExtractors([
				JwtStrategy.extractJWT , //our made strategy 
				ExtractJwt.fromAuthHeaderAsBearerToken(),// in case they send it on the headers
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
		});
	}
	
	private static extractJWT(req: Request) : string {
		return req.cookies?.accessToken || '';
	}

	async validate(payload: jwtPayload) {
		
		const user = await this.prisma.user.findFirst({ where: { login: payload.login, email: payload.email } });
		if(!user) 
			return null;
		return payload;
	}
}
