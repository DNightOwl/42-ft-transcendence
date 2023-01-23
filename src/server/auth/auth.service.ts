import { ForbiddenException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import  { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { user } from '@prisma/client';

//TODO : check if the functions needs try catch or protection

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService,private jwt: JwtService, private configService: ConfigService ) {}

	async handleUser(user : AuthDto,res: Response){

		const userData  = await this.createUserIfNotExist(user);

		//sign jwt 
		const refreshToken =  await this.jwt.signAsync(
			{
				email : userData.email,
				login: userData.login
			},
			{
				secret: this.configService.get('REFRESH_TOKEN_SECRET'),
				expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION') 
			}
		);

		if(!refreshToken) {
			throw new ForbiddenException('');
		}
		//update refresh token to user db
		const userAfterUpdate = await this.updateRefreshToken(userData.login,refreshToken);

	
		await this.refreshTokenCookie(refreshToken, 'token', res);

		return res.send({message : 'Logged in succefully', user: userAfterUpdate}) ;//TODO : think of right payload to send
	}

	async logout(res: Response, login : string) {
		await this.prisma.user.updateMany({
			where: {
				login : login,
				rToken: {
					not : null
				}
			},
			data: {
				rToken : null
			}
		})
		res.clearCookie('token');
		res.clearCookie('accessToken');
		return res.send({msg : "done"}) // TODO :  think of right payload to send
	}

	
	async refreshtoken(user:user,res: Response) {
	
	const accessToken =  await this.jwt.signAsync(
		{
			email : user.email,
			login: user.login
		},
		{
			secret: this.configService.get('ACCESS_TOKEN_SECRET'),
			expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION') 
		}
		);
		
		if(!accessToken) {
			throw new ForbiddenException('');
		}
		
		await this.refreshTokenCookie(accessToken, 'accessToken', res);
		return 'new_access_token';
	}
		
	////////////////helper functions 

	async refreshTokenCookie(token : string, tokenName : string, res: Response) {
		//extract expireIn from jwt token
		const decoded_token = this.jwt.decode(token) as { [key : string]: any };
		const expr_duration = (decoded_token.exp - decoded_token.iat) * 1000;
		
		//cookie setting tokens
		res.cookie(tokenName, token, { maxAge: expr_duration, httpOnly: true });
	}

	//check if user exist if not create it
	async createUserIfNotExist(intraUser : AuthDto) : Promise<user> {
		const login = intraUser.login;
		const user = await this.prisma.user.upsert({
			where: {
				login : intraUser.login,
			},
			update: {},
			create: {
				email: intraUser.email,
				login : intraUser.login,
			},
			});
		return user;
	}

	async updateRefreshToken(login : string, refreshToken : string) {
		
		return await this.prisma.user.update({
			where: {
				login : login
			},
			data:{
				rToken : refreshToken,
			}
		})
	}
}
	