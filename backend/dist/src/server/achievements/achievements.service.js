"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementsService = exports.AchievementType = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
var AchievementType;
(function (AchievementType) {
    AchievementType[AchievementType["POINT"] = 0] = "POINT";
    AchievementType[AchievementType["WIN"] = 1] = "WIN";
    AchievementType[AchievementType["LOSE"] = 2] = "LOSE";
})(AchievementType = exports.AchievementType || (exports.AchievementType = {}));
let AchievementsService = class AchievementsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserAchievements(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                achievements: {
                    select: {
                        Achievement: {
                            select: {
                                name: true,
                            }
                        },
                    }
                }
            },
        });
        const names = user.achievements.map(e => e.Achievement.name);
        return { Achievement: names };
    }
    async checkAchievement(gameStat) {
        const winCount = 1;
        const loseCount = 10;
        let achievementIds = [];
        const craftedGoalPoints = await this.craftAchievementGoal(AchievementType.POINT, gameStat.score);
        const achievementId = await this.fetchAchievementByGoal(craftedGoalPoints);
        if (achievementId === null || achievementId === void 0 ? void 0 : achievementId.id)
            achievementIds.push(achievementId.id);
        if (gameStat.stat === "win") {
            const craftedGoalWins = await this.craftAchievementGoal(AchievementType.WIN, winCount);
            const achievementId = await this.fetchAchievementByGoal(craftedGoalWins);
            if (achievementId === null || achievementId === void 0 ? void 0 : achievementId.id)
                achievementIds.push(achievementId.id);
        }
        else if (gameStat.stat === "lose") {
            const craftedGoalLoses = await this.craftAchievementGoal(AchievementType.LOSE, winCount);
            const achievementId = await this.fetchAchievementByGoal(craftedGoalLoses);
            if (achievementId === null || achievementId === void 0 ? void 0 : achievementId.id)
                achievementIds.push(achievementId.id);
        }
        return achievementIds;
    }
    async craftAchievementGoal(type, value) {
        const typeIndex = type;
        const goal = typeIndex + "|" + value;
        return goal;
    }
    async fetchAchievementByGoal(goal) {
        return await this.prisma.achievement.findUnique({
            where: {
                goals: goal,
            },
            select: {
                id: true,
            },
        });
    }
    async updateUserAchievements(userId, achievementIds) {
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                achievements: {
                    upsert: achievementIds.map((a) => {
                        return {
                            where: {
                                userId_AchievementId: {
                                    AchievementId: a,
                                    userId: userId
                                }
                            },
                            create: {
                                AchievementId: a,
                            },
                            update: {}
                        };
                    }),
                },
            },
        });
    }
};
AchievementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AchievementsService);
exports.AchievementsService = AchievementsService;
//# sourceMappingURL=achievements.service.js.map