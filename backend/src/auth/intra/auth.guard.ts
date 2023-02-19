import {ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import axios from 'axios';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class IntraAuthGuard extends AuthGuard('intra') {

  constructor(private prisma: PrismaService, private configService: ConfigService) {super()}
  async canActivate(context: ExecutionContext) {
    const request = await context.switchToHttp().getRequest();
    const response = await context.switchToHttp().getResponse();
    try {
      if(request.query?.code)
      {
        const res = await axios.post(this.configService.get("TOKEN_URL"),{
          "client_id": this.configService.get('CLIENT_ID'),
          "client_secret": this.configService.get('CLIENT_SECRET'),
          "redirect_uri": this.configService.get('CALLBACK_URL'),
          "code":request.query.code,
          "grant_type":"authorization_code"
        })
        .then(async res=> {
          const intraUser  = await axios({
            method: 'GET',
            url: 'https://api.intra.42.fr/v2/me',
            headers: { Authorization: `Bearer ${res.data.access_token}`}
          })
          .then(res=> res.data)
          ///
          request.user = {
            email: intraUser.email,
            login: intraUser.login,
            imageUrl: intraUser.image.versions.medium,
          };
          return true ;
        });
        return res;
      }
      else
      {
        response.redirect("http://"+this.configService.get('DOMAIN')+":3001/login");
        return false;
      }
    } catch (error) {
      response.redirect("http://"+this.configService.get('DOMAIN')+":3001/login");
      return false;
    }
  }

}

