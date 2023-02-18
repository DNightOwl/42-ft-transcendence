import * as qrcode from 'qrcode'
import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, user } from '@prisma/client';

@Injectable()
export class TFAService {
	constructor(private readonly prisma : PrismaService){}

	async generateQR(user : user) {
		const secret : string = authenticator.generateSecret();
		const otpauth :string = authenticator.keyuri(user.login, 'ft_transcendence', secret);		
		const qrpath :string = await qrcode.toDataURL(otpauth);//TODO : try catch

		///// TODO : should be protected ?
		const updatedUser : user = await  this.prisma.user.update({
			where : { 
				login : user.login ,
			},
			data: {
				two_fa_secret : secret,
				two_fa_valid : false,
			}
		});
		if(updatedUser)
			return qrpath;

		return "none"
	}
	
	async verifyTfaCode(code : string, user : user) : Promise<Boolean>{
		
		const secret :string = user.two_fa_secret;
		if(secret && code)
			return authenticator.check(code, secret);
		return false
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////
	//	this functio will activate or deactivate the 2FA based on the 'enabled' arg status
	//	if enabled true ==> the 2FA will be activated in the DB by setting 'two_fa_enabled' to true
	//	if enabled false ==> the 2FA will be deactivated in the DB by setton 'two_fa_enabled' to false and 'two_fa_secret' to null
	////////////////////////////////////////////////////////////////////////////////////////////

	async tfaActivation(enabled : Boolean,  user : user) {
		if(enabled === true){
			const updateduser : Prisma.BatchPayload  = await  this.prisma.user.updateMany({
				where : { 
					AND: [
						{
							login : user.login,
						},
						{
							two_fa_valid : true
						}
					]
				},
				data: {
					two_fa_enabled : true,
				}
			});
			if(updateduser.count)
				return "enabled";
		}
		else {
			const updateduser : user = await  this.prisma.user.update({
				where : { 
					login : user.login ,
				},
				data: {
					two_fa_enabled : false,
					two_fa_secret : null,
					two_fa_valid : false ,
				}
			});
			if(updateduser)
				return "disabled";
		}
		return "none";
	}

	async two_fa_valid(user : user)
	{
		const updatedUser : user = await  this.prisma.user.update({
			where : { 
				login : user.login ,
			},
			data: {
				two_fa_valid : true ,
			}
		});

		if(updatedUser)
			return "valid";

		return "none"
	}
}

