import { IsString , IsEmail} from "class-validator";

export class UserDto {
	
	
	@IsString()
	public login : string;
    @IsString()
    public  id: string;
    @IsString()
    public nickname: string
    @IsEmail()
    public  email: string
	
}