import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { TFAService } from './2FA/2FA.service';
import { AuthService } from './auth.service';
import { dbUser, RequestWithAuthDto } from './dto/types';
import { IntraAuthGuard } from './intra/auth.guard';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { RefreshGuard } from './jwt/refresh.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly tfa : TFAService) {}

  @UseGuards(IntraAuthGuard)
  @Get('42intra/login')
  handleLogin() {}

  @UseGuards(IntraAuthGuard)
  @Get('42intra/redirect')
  @HttpCode(HttpStatus.OK)
  handleRedirect(@Req() req : RequestWithAuthDto, @Res() res : Response) {
    const user = req.user;
    return this.authService.handleUser(user,res); //TODO :  response format and data
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req : dbUser ,@Res({ passthrough: true }) res : Response) {
    const user = req.user;
    return this.authService.refreshtoken(user,res); //TODO :  response format and data
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout( @Res() res : Response, @Req() req : dbUser ) {
    const user = req.user;
    return this.authService.logout(res,user.login); //TODO :  response format and data
  }

  ////// @2FA // TODO

  @UseGuards(JwtAuthGuard)
  @Post('generateqr')
  generateQR(@Req() req : dbUser) {
    const user = req.user;
    return this.tfa.generateQR(user);//TODO :  response format and data
  }


  @UseGuards(JwtAuthGuard)
  @Post('enabletfa')
  async enableTFA(@Body('code') code: string, @Req() req : dbUser) { //example {"code": "345678"}
		const isValid = await this.tfa.verifyTfaCode(code, req.user) ;
    if(isValid === true)
      this.tfa.tfaActivation(true,req.user);
    return isValid; //TODO :  response format and data
	}
	
  @UseGuards(JwtAuthGuard)
  @Post('disabletfa')
	async disableTFA(@Body('code') code: string, @Req() req : dbUser) {
    const isValid =  await this.tfa.verifyTfaCode(code, req.user) ;
    if(isValid === true)
      this.tfa.tfaActivation(false,req.user);
    return isValid; //TODO :  response format and data
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('tfaverification')
	async signinTfaVerification(@Body('code') code: string, @Req() req : dbUser, @Res({ passthrough: true }) res : Response) {
    const isValid =  await this.tfa.verifyTfaCode(code, req.user) ;
    if(isValid === true)
    {
      const refreshToken = await this.authService.generateTokens(req.user, "refresh");
      await this.authService.updateRefreshToken( req.user.login,refreshToken);
      await this.authService.refreshCookie(refreshToken, 'token', res);
      return {msg : "tfa is valid"};//TODO :  response format and data
    }
    return {msg : "tfa not valid"}; //TODO :  response format and data
  }


}