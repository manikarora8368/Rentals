import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,IsNotEmpty ,MinLength} from "class-validator";
export class LoginDto{
    @ApiProperty({example:'yourmail@mail.com' , description: 'Enter your Mail'})
    @IsEmail({},{message: 'Invalid Email Entered'})
    @IsNotEmpty()
    email: string;
    @ApiProperty({example:'password' , description:'Enter your password'})
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}