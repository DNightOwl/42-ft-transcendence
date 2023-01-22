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
		

		//sign jwt and return to user
		const refreshToken =  await this.signRefreshToken({
			email : userData.email,
			login: userData.login
		});
		const accessToken =  await this.signAccessToken({
			email : userData.email,
			login: userData.login
		});
		//
		if(!refreshToken || !accessToken) {
			throw new ForbiddenException('');
		}
		//update refresh token to user db
		const userAfterUpdate = await this.updateRefreshToken(userData.login,refreshToken);
		// this.refreshToken(refreshToken);

		const decoded_aToken = this.jwt.decode(accessToken) as { [key : string]: any };
		const decoded_rToken = this.jwt.decode(refreshToken) as { [key : string]: any };
		const at_expr_duration = (decoded_aToken.exp - decoded_aToken.iat) * 1000;
		const rt_expr_duration = (decoded_rToken.exp - decoded_rToken.iat) * 1000;
		//cookie setting tokens
		res.cookie('token', refreshToken, { maxAge: rt_expr_duration, httpOnly: true });
		res.cookie('accessToken', accessToken, { maxAge: at_expr_duration, httpOnly: true });
		///

		///
		return res.send({message : 'Logged in succefully', user: userAfterUpdate}) ;//
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
		return res.send({msg : "done"}) // TODO : should redirect me to the signin page
	}

	//check if user exist if not create it
	async createUserIfNotExist(user : AuthDto) : Promise<user> {
		// check if user exist
		const login = user.login;
		const foundUser = await this.prisma.user.findUnique({where: { login}})
		if( !foundUser ) {
			//create the user
			return await this.prisma.user.create({
				data : {
					email : user.email,
					login : user.login
				}
			})	
		}
		return foundUser;
	}

	//helper to sign the jwt token
	async signRefreshToken(args: {email:string,login:string}) {
		const payload = args
		return this.jwt.signAsync(payload, {secret: this.configService.get('REFRESH_TOKEN_SECRET'),expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION') })
	}

	async signAccessToken(args: {email:string,login:string}) {
		/////
		const payload = args
		return this.jwt.signAsync(payload, {secret: this.configService.get('ACCESS_TOKEN_SECRET'), expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION') })
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

 	async refreshtoken(user:user,res: Response) {
	
		const accessToken =  await this.signAccessToken({
			email : user.email,
			login: user.login
		});
		
		//
		if(!accessToken) {
			throw new ForbiddenException('');
		}
		const decoded_token = this.jwt.decode(accessToken) as { [key : string]: any };
		const expr_duration = (decoded_token.exp - decoded_token.iat) * 1000;
		
		//cookie setting tokens
		res.cookie('accessToken', accessToken, { maxAge: expr_duration, httpOnly: true });
		return 'new_access_token';
	}
}
