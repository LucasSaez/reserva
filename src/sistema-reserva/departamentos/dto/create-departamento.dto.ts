import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDepartamentoDto {

    id?: number;

    @IsInt()
    @IsNotEmpty()
    nroDepartamento: number;


    @IsString()
    @IsOptional()
    descripcion:string;


}