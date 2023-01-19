import { AuthDto } from "./auth.dto";

export type RequestWithUser = Request & { user: AuthDto | undefined | null };

export type jwtPayload = {
	login : string,
	email : string
}