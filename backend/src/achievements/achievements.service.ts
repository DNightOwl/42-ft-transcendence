import { Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


export enum AchievementType {
	POINT = 0,
	WIN = 1,
	LOSE = 2,
}

type Nullable<T> = T | null;

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

	async checkAchievement(gameStat : {userid:string , stat: string , score : number}) : Promise<string[]> {
		const wonGames : {wonGames : Game[]} = await this.prisma.user.findFirst({
			where:{
				id : gameStat.userid,
			},
			select:
			{
				wonGames:true
			}
		})
		const lostGames : {lostGames : Game[]} = await this.prisma.user.findFirst({
			where:{
				id : gameStat.userid,
			},
			select:
			{
				lostGames:true
			}
		})
		const winCount : number= wonGames.wonGames.length + (gameStat.stat === "win" ? 1: 0);
		const loseCount : number= lostGames.lostGames.length + (gameStat.stat === "lose" ? 1: 0);
		let achievementIds : Nullable<string[]|null> = []

		const craftedGoalPoints : string = await this.craftAchievementGoal(AchievementType.POINT, gameStat.score);
		const achievementId : { id : string} = await this.fetchAchievementByGoal(craftedGoalPoints);
		if(achievementId?.id)
			achievementIds.push(achievementId.id);
		//if check achievement with win
		//else check achievement with lose
		if(gameStat.stat === "win") {
			//get count of wins in match history
			const craftedGoalWins : string = await this.craftAchievementGoal(AchievementType.WIN, winCount);
			const achievementId : {id : string} = await this.fetchAchievementByGoal(craftedGoalWins);
			if( achievementId?.id)
				achievementIds.push(achievementId.id);
		}
		else if (gameStat.stat === "lose") {
			//get count of loses in match history
			const craftedGoalLoses : string = await this.craftAchievementGoal(AchievementType.LOSE, loseCount);
			const achievementId : { id : string} = await this.fetchAchievementByGoal(craftedGoalLoses);
			if( achievementId?.id)
				achievementIds.push(achievementId.id);
		}
		return achievementIds;
	}

	private async craftAchievementGoal(type : AchievementType, value: number): Promise<string>{
		const typeIndex : number = type;
		const goal : string = typeIndex+"|"+value;
		return goal;
	}

	private async fetchAchievementByGoal(goal :string) : Promise<{id:string}> {
		return await this.prisma.achievement.findUnique({
			where : {
				goals : goal,
			},
			select :
			{
				id : true,
			},
		})
	}

	async updateUserAchievements(userId : string, achievementIds:string[]) {
		await this.prisma.user.update({
			where: {
			  id: userId
			},
			data: {
				achievements : {
					upsert: achievementIds.map((a) => {
						return {
							where: {
								userId_AchievementId: {
									AchievementId: a,
									userId: userId
								}
							},
							create: {
								AchievementId : a,
							},
							update: {}
						}
					}),
				},
			},
		  });
	}
	
}
