import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtPayload } from '../dto/types';


@Injectable()
export class TfaGuard implements CanActivate {

  constructor(private prisma: PrismaService,private readonly jwt: JwtService,  private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.token;

    if (!token)
      return false;

    const payload :jwtPayload = await this.jwt.verify(token, {
        secret: this.configService.get("REFRESH_TOKEN_SECRET"),
    })
    
		const user = await this.prisma.user.findFirst({ where: { login: payload.login } });
    
    if (!user)
      return false;
    
    request.user = user;

  	return true;
  }
}