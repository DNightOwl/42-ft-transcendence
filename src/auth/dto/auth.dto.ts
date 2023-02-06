import { IsString , IsEmail} from "class-validator";

export class AuthDto {
	@IsEmail()
	@IsString()
	public email : string;
	
	@IsString()
	public login : string;
	
}