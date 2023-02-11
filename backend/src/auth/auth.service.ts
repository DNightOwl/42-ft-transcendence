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
	constructor(private readonly prisma: PrismaService,private readonly jwt: JwtService, private readonly configService: ConfigService ) {}

	async handleUser(user : AuthDto,res: Response){// TODO : name to be changed to signin

		let userData  = await this.createUserIfNotExist(user);

		//sign jwt 
		const refreshToken = await this.generateTokens(userData , "refresh");

		if(!refreshToken) {
			throw new ForbiddenException('');//TODO : is it the right status ?
		}

		//check if 2fa is  enable === false
		if (userData.two_fa_enabled === false )
		{
			//update refresh token to user db
			userData = await this.updateRefreshToken(userData.login,refreshToken);
		}

		await this.refreshCookie(refreshToken, 'token', res);

		//check if 2fa is  enable === true
		if (userData.two_fa_enabled === true)
		{
			//return for the user to verify the code 2fa
			return res.send({message : '2FA is activated verify code'}) ;//TODO : think of right payload to send // example : res.status(404).send('Sorry, cant find that');
		}

		return res.redirect("http://localhost:3001/home") ;//TODO : think of right payload to send // example : res.status(404).send('Sorry, cant find that');
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
	
		const accessToken =  await this.generateTokens(user , "access")
		// const accessToken =  await this.jwt.signAsync(
		// {
		// 	email : user.email,
		// 	login: user.login
		// },
		// {
		// 	secret: this.configService.get('ACCESS_TOKEN_SECRET'),
		// 	expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION') 
		// }
		// );
		
		if(!accessToken) {
			throw new ForbiddenException('');
		}
		
		await this.refreshCookie(accessToken, 'accessToken', res);
		// return 'new_access_token';//TODO : think of right payload to send // example : res.status(404).send('Sorry, cant find that');
	}
		
	////////////////helper functions 

	async refreshCookie(token : string, tokenName : string, res: Response) {
		//extract expireIn from jwt token
		const decoded_token = this.jwt.decode(token) as { [key : string]: any };
		const expr_duration = (decoded_token.exp - decoded_token.iat) * 1000;
		
		//cookie setting tokens
		res.cookie(tokenName, token, { maxAge: expr_duration, httpOnly: true});
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
					nickname : intraUser.login,
					pictureLink : intraUser.imageUrl,
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

	async generateTokens(user : user, type : string ) {
		let secret = "";
		let expiresIn = "";
		if(type === "refresh")
		{
			secret = this.configService.get('REFRESH_TOKEN_SECRET');
			expiresIn = this.configService.get('REFRESH_TOKEN_EXPIRATION');
		}
		else if (type === "access")
		{
			secret = this.configService.get('ACCESS_TOKEN_SECRET'),
			expiresIn = this.configService.get('ACCESS_TOKEN_EXPIRATION')
		}

		const refreshToken =  await this.jwt.signAsync(
			{
				email : user.email,
				login: user.login
			},
			{
				secret: secret,
				expiresIn: expiresIn 
			}
		);
		return refreshToken;
	}

}
	