import {Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Patch,
    Delete,
    Req,
    Body,
    UseFilters,} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { RoomService } from './room.service';;
import { dbUser } from '../../users/dto/types';
import { ForbiddenException} from "@nestjs/common";
import { HttpExceptionFilter } from './room.exception';


@Controller('rooms')
export class RoomController
{
    constructor(private prisma: PrismaService, private roomservice: RoomService) {}
    @UseGuards(JwtAuthGuard)
    @UseFilters(new HttpExceptionFilter())
    @Post('createroom')
    async CreateRoom(@Req() req: dbUser, @Body() room) {
        try{
            const user = req.user
            if (room.data.type === "public" || room.data.type === "private")
                await this.roomservice.CreateRoom(user.login, room.data.name, room.data.type);
            else
                await this.roomservice.CreateRoomprotected(user.login, room.data.name, room.data.type, room.data.password);
        }
        catch (error) {
            throw new ForbiddenException('name existe');
          }
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Post('/joinroom')
    async  joinroom(@Req() req: dbUser, @Body() room)
    {
        try
        {
            const user = req.user
            if (room.data.type === "public")
               return await this.roomservice.joinroom(user, room.data.name);
            else if (room.data.type == "protected")
                return await this.roomservice.joinroomprotected(user, room);
        }
        catch(error) {}
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Post('/addtoroom')
    async addtoroom(@Req() req: dbUser, @Body() room)
    {
        try
        {

        
        const user = req.user;
        if (room.data.type == "public")
            await this.roomservice.addtoroom(user, room); 
        else
            await this.roomservice.addtoroomNopublic(user, room);
        }
        catch(error){}        
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Get('/FreindNotjoin/:name')
    async   getfreindNotjoinRoom(@Req() req: dbUser, @Param('name') name: string)
    {
        const user = req.user;
        return await this.roomservice.getfreindNotjoinRoom(user, name);
    }
    
    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Get('/usersinroom/:name')
    async   getallUserinRoom(@Req() req: dbUser, @Param('name') name: string)
    {
        const user = req.user;
        return await this.roomservice.getallUsersinRoom(user, name);
    }

    @UseFilters(new HttpExceptionFilter())
     @UseGuards(JwtAuthGuard)
     @Post('quiteRoom')
     async  quite_room(@Req() req: dbUser, @Body() rom)
     {
        const user = req.user;
       return await this.roomservice.quite_room(user, rom);
        
     }
    
    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Get('allrooms')
    async getallRooms(@Req() req: dbUser)
    {
        const user = req.user;
        return await this.roomservice.getAllRooms(user);
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Post('/setadmins')
     async  setuseradmins(@Req() req: dbUser, @Body() room)
     {
        try
        {
            const user = req.user;
            await this.roomservice.adduseradmins(user, room);
        }
        catch(error){}
     }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Patch('/ban')
     async  banmember(@Req() req: dbUser, @Body() room)
    {
        const user = req.user
        await this.roomservice.banmember(user, room);
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Patch('/kick')
     async  kickmember(@Req() req: dbUser, @Body() room)
    {
        const user = req.user
        await this.roomservice.quickmember(user, room);
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Patch('/unblockfromroom')
     async  unblock(@Req() req: dbUser, @Body() room)
    {
        const user = req.user
        await this.roomservice.unblockfromroom(user, room);
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Get('allmessages')
    async   getMessage(@Body() room)
    {
        return await this.roomservice.getMessage(room.name); 
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Get('DM')
    async   getDM(@Req() req: dbUser)
    {
        const user = req.user     
        return await this.roomservice.getDM("personnel", user);
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Get('DMWithAllUsers')
    async   getDMWithAllUsers(@Req() req: dbUser)
    {
        const user = req.user     
        return await this.roomservice.getDMWithAllUsers("personnel", user);
    }
    
    
    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Get('RoomMessage')
    async   getRM(@Req() req: dbUser)
    {
        const user = req.user
        
        return await this.roomservice.getRM(user);
    }
    
    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Patch('muted')
    async muteduser(@Req() req: dbUser, @Body() room) {
        const user = req.user;
        return await this.roomservice.muted(user, room);
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Patch('unmuted')
    async unmuteduser(@Req() req: dbUser, @Body() room) {
        const user = req.user;
        return await this.roomservice.unmuted(user, room);
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(JwtAuthGuard)
    @Delete('Deleteroom/:name')
    async   DeleteRoom(@Req() req: dbUser, @Param()  room)
    {
        const user = req.user;
        return this.roomservice.deleteroom(user, room);
    }
}

