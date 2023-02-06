import { Injectable } from '@nestjs/common';
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

	// user1 game stats:{userid : xxxxxxx ,stat: "win" , score : 20}
	// user2 game stats:{userid : xxxxxxx ,stat: "lose" , score : 4}
	async checkAchievement(gameStat : {userid:string , stat: string , score : number}) : Promise<string[]> {
		const winCount : number= 1;
		const loseCount : number= 10;
		let achievementIds : Nullable<string[]|null> = []
		//check achievement with point
		const craftedGoalPoints = await this.craftAchievementGoal(AchievementType.POINT, gameStat.score);
		const achievementId = await this.fetchAchievementByGoal(craftedGoalPoints);
		if( achievementId?.id)
				achievementIds.push(achievementId.id);
		//if check achievement with win
		//else check achievement with lose
		if(gameStat.stat === "win") {
			//get count of wins in match history
			const craftedGoalWins = await this.craftAchievementGoal(AchievementType.WIN, winCount);
			const achievementId = await this.fetchAchievementByGoal(craftedGoalWins);
			if( achievementId?.id)
				achievementIds.push(achievementId.id);
		}
		else if (gameStat.stat === "lose") {
			//get count of loses in match history
			const craftedGoalLoses = await this.craftAchievementGoal(AchievementType.LOSE, winCount);
			const achievementId = await this.fetchAchievementByGoal(craftedGoalLoses);
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

	private async updateUserAchievements(userId : string, achievementIds:string[]) {
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

// /////testing achivements 
// const achievementIds :string[]= await this.achi.checkAchievement({userid:user.id , stat: "win" , score : 5});
// update the achievements relation with user
// await this.updateUserAchievements(userid , achievementIds);
// /////end testing achivements