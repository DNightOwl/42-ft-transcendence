import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findProfile(login: string): Promise<{
        login: string;
        id: string;
        nickname: string;
        email: string;
    }>;
    updateuserinfo(login: string, nickname: string): Promise<void>;
    getfreind(login: string): Promise<{
        freinds: import(".prisma/client").Freinds[];
    }>;
    addfreind(login: string, freindlogin: string): Promise<void>;
    unfreind(login: string, freind: any): Promise<void>;
    banuser(login: string, flogin: string): Promise<void>;
    unblocked(login: string, flogin: string): Promise<void>;
}
