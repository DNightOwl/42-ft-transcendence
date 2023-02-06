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
import { PrismaService } from "src/prisma/prisma.service";
import { RoomDto} from "./dto";
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { RoomService } from './room.service';
import { prisma } from '@prisma/client';
import { dbUser } from '../../users/dto/types';
import * as moment from 'moment';

interface mytype{
    name:string
}

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
    @Post('/addroom')
    async  addroom(@Req() req: dbUser, @Body() room)
    {
        const user = req.user
        if (room.type === "public")
            await this.roomservice.addroom(user, room.name);
        else
            await this.roomservice.addroomprotected(user, room);
    }

    
    @UseGuards(JwtAuthGuard)
    @Post('/addtoroom')
    async addtoroom(@Req() req: dbUser, @Body() room)
    {
        const user = req.user;
        await this.roomservice.addtoroom(user, room); 
    }
    
    @Get('/userswithroom/:name')
    async   getallUserswithRoom(@Param('name') name: string)
    {
        return await this.roomservice.getallUserswithRoom(name);
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

    @UseGuards(JwtAuthGuard)
    @Patch('/unblockfromroom')
     async  unblock(@Req() req: dbUser, @Body() room)
    {
        const user = req.user
        await this.roomservice.unblockfromroom(user, room);
    }

    @Get('allmessages')
    async   getMessage(@Body() room)
    {
        return await this.roomservice.getMessage(room.name);
    }

    @UseGuards(JwtAuthGuard)
    @Get('DM')
    async   getDM(@Req() req: dbUser)
    {
        const user = req.user
        
        return await this.roomservice.getDM("personnel", user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('RoomMessage')
    async   getRM(@Req() req: dbUser)
    {
        const user = req.user
        
        return await this.roomservice.getRM(user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch('muted')
    async muteduser(@Req() req: dbUser, @Body() room) {
        const user = req.user;
        return await this.roomservice.muted(user, room);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('unmuted')
    async unmuteduser(@Req() req: dbUser, @Body() room) {
        const user = req.user;
        return await this.roomservice.unmuted(user, room);
    }

}

