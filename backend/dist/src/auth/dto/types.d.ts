import { user } from "@prisma/client";
import { AuthDto } from "./auth.dto";
export declare type RequestWithAuthDto = Request & {
    user: AuthDto | undefined | null;
};
export declare type jwtPayload = AuthDto;
export declare type dbUser = Request & {
    user: user | undefined | null;
};
