import { Response } from 'express';
import { TFAService } from './2FA/2FA.service';
import { AuthService } from './auth.service';
import { dbUser, RequestWithAuthDto } from './dto/types';
export declare class AuthController {
    private readonly authService;
    private readonly tfa;
    constructor(authService: AuthService, tfa: TFAService);
    handleLogin(): void;
    handleRedirect(req: RequestWithAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: dbUser, res: Response): Promise<string>;
    logout(res: Response, req: dbUser): Promise<Response<any, Record<string, any>>>;
    generateQR(req: dbUser): Promise<string>;
    enableTFA(code: string, req: dbUser): Promise<Boolean>;
    disableTFA(code: string, req: dbUser): Promise<Boolean>;
    signinTfaVerification(code: string, req: dbUser, res: Response): Promise<{
        msg: string;
    }>;
}
