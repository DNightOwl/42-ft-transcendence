// import qrcode from 'qrcode';
import * as qrcode from 'qrcode'
import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { PrismaService } from 'src/server/prisma/prisma.service';
import { AuthDto } from '../dto/auth.dto';
import { Response } from 'express';

@Injectable()
export class TFAService {
	constructor(private readonly prisma : PrismaService){}

	async generateQR(user : AuthDto, res : Response) {
		//generate secret and qr
		//update db with secret
		//return qr path
	}
	
	
	async activateTFA() {
		//call verifyTfaCode(...)
		//if true 
		//update db enabled true
		//return true
		// return false
	}
	
	async deactivateTFA() {
		//call verifyTfaCode(...)
		//if true 
		//update db enabled false and secret null
		//return true;
		//return false
	}
	
	async verifyTfaCode(user : AuthDto, res : Response) {
		//if code correct
			//return true
		// return false
	}
}

