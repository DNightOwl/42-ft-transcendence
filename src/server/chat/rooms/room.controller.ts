import {Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Patch,
    Delete,
    Req,
    Body,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from "src/server/prisma/prisma.service";
import { RoomDto} from "./dto";
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { RoomService } from './room.service';
import { prisma } from '@prisma/client';
import { dbUser } from '../../users/dto/types';
import moment, * as moments from 'moment';


@Controller('rooms')
export class RoomController
{
    constructor(private prisma: PrismaService, private roomservice: RoomService) {}
    @UseGuards(JwtAuthGuard)
    @Post('createroom')
    async CreateRoom(@Req() req: dbUser, @Body() room) {
        const user = req.user
        if (room.type === "public" || room.type === "private")
            await this.roomservice.CreateRoom(user.login, room.name, room.type);
        else
            await this.roomservice.CreateRoomprotected(user.login, room.name, room.type, room.password);
      }

      @UseGuards(JwtAuthGuard)
      @Post('/addtoroom')
     async  addtoroom(@Req() req: dbUser, @Body() room)
     {
        const user = req.user
        if (room.type === "public")
            await this.roomservice.addtoroom(user, room.name);
        else
            await this.roomservice.addtoroomprotected(user, room);
     }

     

     @UseGuards(JwtAuthGuard)
     @Post('quiteRoom')
     async  quite_room(@Req() req: dbUser, @Body() rom)
     {
        const user = req.user;
       return await this.roomservice.quite_room(user, rom);
        
     }
    
    @Get('allrooms')
    async getallRooms()
    {
        return await this.roomservice.getallRooms();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async   getRoomsForUser(@Req() req: dbUser)
    {
        const user = req.user;
        return await this.roomservice.getRoomsForUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/setadmins')
     async  setuseradmins(@Req() req: dbUser, @Body() room)
     {
        const user = req.user;
        await this.roomservice.adduseradmins(user, room);
     }

     @UseGuards(JwtAuthGuard)
    @Patch('/ban')
     async  banmember(@Req() req: dbUser, @Body() room)
    {
        const user = req.user
        await this.roomservice.banmember(user, room);
    }

    
    // @UseGuards(JwtAuthGuard)
    // @Patch('muted')
    // async muteduser(@Req() req: dbUser, @Body() room) {
    //     const user = req.user;
    //      await moment().add(1, 'days').calendar()
    //     // await this.prisma.muted.create({
    //     //   data: {
    //     //     roomName: room.name,
    //     //     userLogin: room.userLogin,
    //     //     time: time
    //     //   }
    //     // }) 
    //   }

}

