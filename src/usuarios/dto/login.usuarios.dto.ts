import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class LoginUsuarioDto {

    @IsString()
    @IsEmail()
    email: string;


    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password:string;


}