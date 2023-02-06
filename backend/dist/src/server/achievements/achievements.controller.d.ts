import { AchievementsService } from './achievements.service';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    getUserAchievements(userId: string): Promise<{
        Achievement: string[];
    }>;
}
