// import qrcode from 'qrcode';
import * as qrcode from 'qrcode'
import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { PrismaService } from 'src/server/prisma/prisma.service';

@Injectable()
export class TFAService {
	constructor(private readonly prisma : PrismaService){}

	async enableTFA() {
		
	}

	async disableTFA() {

	}
}

