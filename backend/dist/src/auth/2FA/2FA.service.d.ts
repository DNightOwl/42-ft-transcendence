import { PrismaService } from 'src/prisma/prisma.service';
import { user } from '@prisma/client';
export declare class TFAService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateQR(user: user): Promise<string>;
    verifyTfaCode(code: string, user: user): Promise<Boolean>;
    tfaActivation(enabled: Boolean, user: user): Promise<void>;
}
