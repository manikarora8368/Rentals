import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric,IsEmail,IsNotEmpty, Matches, MaxLength, MinLength,} from "class-validator";
export class CreateUserDto{
    @ApiProperty({example:'John Doe' , description: 'Your Name'})
    @IsNotEmpty()
    @Matches(/^[a-z\d\-_\s]+$/i,{message: 'Name must contain only Alphabet and Numbers'})
    @MaxLength(25)
    name: string;
    @ApiProperty({example:'yourmail@mail.com' , description: 'Enter your Mail'})
    @IsEmail({},{message: 'Invalid Email Entered'})
    @IsNotEmpty()
    email: string;
    @ApiProperty({example:'password' , description:'Enter your password'})
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}