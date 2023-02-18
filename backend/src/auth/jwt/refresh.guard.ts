import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class RefreshGuard implements CanActivate {

  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies?.token;

    if (!refreshToken)
      return false;

		const user = await this.prisma.user.findFirst({ where: { rToken: refreshToken } });
    
    if (!user)
      return false;
    
    request.user = user;

  	return true;
  }
}