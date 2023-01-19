import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/server/prisma/prisma.service';


@Injectable()
export class RefreshGuard implements CanActivate {

  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies?.token;

    if (!refreshToken)
      return false;

    //in case the jwt was hashed
    // decode jwt
    // get login from decoded jwt
    // get user by login
    // check if hashingLibrary.verify(refreshToken, user.hashedRT) == true
    // or
		const user = await this.prisma.user.findFirst({ where: { rToken: refreshToken } });
    
    if (!user)
      return false;
    
    request.user = user;

  	return true;
  }
}