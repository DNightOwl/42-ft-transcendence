import { UserDto } from "./user.dto";

export type RequestWithUser = Request & { user: UserDto | undefined | null };

export type jwtPayload = {
	login : string,
	id : string,
	nickname: string
}