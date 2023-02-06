import { user } from "@prisma/client";
import { AuthDto } from "./auth.dto";

export type RequestWithAuthDto = Request & { user: AuthDto | undefined | null };

export type jwtPayload = AuthDto;

export type dbUser = Request & { user: user | undefined | null };