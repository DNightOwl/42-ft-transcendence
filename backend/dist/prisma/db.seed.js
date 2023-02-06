"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDB = void 0;
const client_1 = require("@prisma/client");
async function populateDB() {
    const prisma = new client_1.PrismaClient();
    await prisma.achievement.upsert({
        where: {
            name: 'First win',
        },
        update: {},
        create: {
            name: 'First win',
            goals: '1|1',
        }
    });
    await prisma.achievement.upsert({
        where: {
            name: 'First lose',
        },
        update: {},
        create: {
            name: 'First lose',
            goals: '2|1',
        }
    });
    await prisma.achievement.upsert({
        where: {
            name: '3 win streak',
        },
        update: {},
        create: {
            name: '3 win streak',
            goals: '1|3',
        }
    });
    await prisma.achievement.upsert({
        where: {
            name: '2 lose streak',
        },
        update: {},
        create: {
            name: '2 lose streak',
            goals: '2|2',
        }
    });
    await prisma.achievement.upsert({
        where: {
            name: '5 points in a game',
        },
        update: {},
        create: {
            name: '5 points in a game',
            goals: '0|5',
        }
    });
    await prisma.$disconnect();
}
exports.populateDB = populateDB;
//# sourceMappingURL=db.seed.js.map