import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RequestWithUser } from './dto/types';
import { IntraAuthGuard } from './intra/auth.guard';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { RefreshGuard } from './jwt/refresh.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(IntraAuthGuard)
  @Get('42intra/login')
  handleLogin() {
  }

  @UseGuards(IntraAuthGuard)
  @Get('42intra/redirect')
  @HttpCode(HttpStatus.OK)
  handleRedirect(@Req() req : RequestWithUser, @Res() res : Response) {
    const user = req.user;
    return this.authService.handleUser(user,res);
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req : RequestWithUser ,@Res({ passthrough: true }) res : Response) {
    const user = req.user;
    return this.authService.refreshtoken(user,res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout( @Res() res : Response, @Req() req : RequestWithUser ) {
    const user = req.user;
    return this.authService.logout(res,user.login);
  }

}