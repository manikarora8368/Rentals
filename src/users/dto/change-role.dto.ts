import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ChangeRoleDto{
    @ApiProperty({example:'mail@mail.com' , description:'Mail whose role to be changed'})
    @IsEmail({},{message: 'Invalid Email Entered'})
    @IsNotEmpty()
    email: string;
    @ApiProperty({example:'user|realtor|admin' })
    @IsNotEmpty()
    role: string;
}