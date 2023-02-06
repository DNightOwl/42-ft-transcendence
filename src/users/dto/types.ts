import { UserDto } from "./user.dto";
import { user } from "@prisma/client";

export type RequestWithUser = Request & { user: UserDto | undefined | null };

export type jwtPayload = UserDto;

export type dbUser = Request & { user: user | undefined | null };