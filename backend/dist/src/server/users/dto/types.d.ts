import { UserDto } from "./user.dto";
import { user } from "@prisma/client";
export declare type RequestWithUser = Request & {
    user: UserDto | undefined | null;
};
export declare type jwtPayload = UserDto;
export declare type dbUser = Request & {
    user: user | undefined | null;
};
