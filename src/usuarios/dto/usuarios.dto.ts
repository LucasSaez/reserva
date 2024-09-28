//aca hacemos uso de un dto(data transfer object)
//aca hacemos uso de decoradores y funcionalidades para cuando mandemos esos datos por endpoint, que cumplan ciertas reglas antes de ser insertadas en la base de datos
//esto ahorra problemos a largo plazo ya sea por tipado de datos,o informacion mal almacenada

import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { RoleStatusList } from "../auth/enum/role.enum";
import { RoleStatus } from "../entity/usuarios.entity";

export class UsuarioDto{
    id:number;

    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsEnum(
        RoleStatusList,{
            message: `solo roles como ${RoleStatus.ADMIN} o ${RoleStatus.USER}`
        }
    )
    @IsOptional()
    role?: RoleStatus = RoleStatus.USER

    @IsString()
    @MinLength(8,{
        message: 'deben ser minimo 8 caracteres'
    })
    password:string;


    @IsString()
    @IsUUID(4)
    @IsOptional()
    codigoUnico: string;


    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;

    @IsString()
    @IsOptional()
    avatar?:string;
}