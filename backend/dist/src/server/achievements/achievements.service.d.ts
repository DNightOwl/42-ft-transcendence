import { PrismaService } from '../prisma/prisma.service';
export declare enum AchievementType {
    POINT = 0,
    WIN = 1,
    LOSE = 2
}
export declare class AchievementsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserAchievements(userId: string): Promise<{
        Achievement: string[];
    }>;
    checkAchievement(gameStat: {
        userid: string;
        stat: string;
        score: number;
    }): Promise<string[]>;
    private craftAchievementGoal;
    private fetchAchievementByGoal;
    private updateUserAchievements;
}
