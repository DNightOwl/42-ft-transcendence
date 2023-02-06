import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy  } from "passport-oauth2";
import axios from 'axios';
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy,'intra') {
	constructor(private prisma: PrismaService, private configService: ConfigService) {
		super({
			authorizationURL: configService.get('AUTHORIZATION_URL'),
			tokenURL: configService.get('TOKEN_URL'),
			clientID: configService.get('CLIENT_ID'),
			clientSecret: configService.get('CLIENT_SECRET'),
			callbackURL: configService.get('CALLBACK_URL'),
		});
	}

	async validate(accessToken: string , _refreshToken: string, _profile: Profile) {
		///
		const intraUser = await axios({
			method: 'GET',
			url: 'https://api.intra.42.fr/v2/me',
			headers: { Authorization: `Bearer ${accessToken}`}
		  }).then(res=> res.data)
		///
				
		return intraUser ;
	}
}