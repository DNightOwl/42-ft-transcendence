import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { TFAService } from './2FA/2FA.service';
import { AuthService } from './auth.service';
import { dbUser, RequestWithAuthDto } from './dto/types';
import { IntraAuthGuard } from './intra/auth.guard';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { RefreshGuard } from './jwt/refresh.guard';
import { TfaGuard } from './2FA/tfa.guard';
import { AuthDto } from './dto/auth.dto';
import { user } from '@prisma/client';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tfa : TFAService,
    private configService: ConfigService
  ) {}

  @Get('42intra/login')
  handleLogin(@Res() res : Response) {
    res.redirect(this.configService.get("AUTHORIZATION_URL")+
      "?client_id="+this.configService.get("CLIENT_ID")+
      "&redirect_uri="+this.configService.get("CALLBACK_URL")+
      "&response_type=code&scope=public&state="+this.configService.get("ACCESS_TOKEN_SECRET"));
  }

  @UseGuards(IntraAuthGuard)
  @Get('42intra/redirect')
  @HttpCode(HttpStatus.OK)
  handleRedirect(@Req() req : RequestWithAuthDto, @Res() res : Response) {
    const user : AuthDto = req.user;
    return this.authService.handleUser(user,res);
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req : dbUser ,@Res({ passthrough: true }) res : Response) {
    const user = req.user;
    return this.authService.refreshtoken(user,res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout( @Res({ passthrough: true }) res : Response, @Req() req : dbUser ) {
    const user : user = req.user;
    return this.authService.logout(res,user.login);
  }

  ////// @2FA // TODO

  @UseGuards(JwtAuthGuard)
  @Post('generateqr')
  generateQR(@Req() req : dbUser) {
    const user : user = req.user;
    return this.tfa.generateQR(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post('enabletfa')
  async enableTFA(@Req() req : dbUser) {
    return this.tfa.tfaActivation(true,req.user);
	}
	
  @UseGuards(JwtAuthGuard)
  @Post('disabletfa')
	async disableTFA( @Req() req : dbUser) {
    return this.tfa.tfaActivation(false,req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('codeverification')
	async settingsTfaVerification(@Body('code') code: string, @Req() req : dbUser, @Res({ passthrough: true }) res : Response) {
    const isValid : Boolean =  await this.tfa.verifyTfaCode(code, req.user) ;
    if(isValid === true)
      return this.tfa.two_fa_valid(req.user);
    return "invalid";
  }

  @UseGuards(TfaGuard)
  @Post('tfaverification')
	async signinTfaVerification(@Body('code') code: string, @Req() req : dbUser, @Res({ passthrough: true }) res : Response) {
    const isValid : Boolean =  await this.tfa.verifyTfaCode(code, req.user) ;
    if(isValid === true)
    {
      const refreshToken : string = await this.authService.generateTokens(req.user, "refresh");
      await this.authService.updateRefreshToken( req.user.login,refreshToken);
      await this.authService.refreshCookie(refreshToken, 'token', res);
      return "valid";
    }
    return "invalid";
  }


}