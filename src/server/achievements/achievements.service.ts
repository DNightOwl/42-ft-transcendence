import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AchievementsService {
	constructor(private readonly prisma : PrismaService){}
	
	async getUserAchievements(userId : string) {
		
		const user  = await this.prisma.user.findUnique({
			where: {
				id : userId,
			},
			select : {
				id : true,
				achievements : {
					select:{
						Achievement :
						{
							select: {
								name: true,
							}
						},
					}
				}
			},
		});

		const names : string[] = user.achievements.map(e => e.Achievement.name);
		
		return {Achievement : names};
	}

	
}
