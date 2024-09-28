import { IsBoolean, isDate, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { CreateParcelaDto } from "src/sistema-reserva/parcelas/dto/create-parcela.dto";
import { UsuarioDto } from "src/usuarios/dto/usuarios.dto";

export class CreateIngresoDto {

    id: number;


    @IsDateString({strict: false })
    entrada: Date;

    @IsOptional()
    @IsDateString({strict: false})
    salida: Date;

    @IsString()
    @IsUUID(4,{
        message: 'ingrese un codigo de tipo uuid o escribalo bien'
    })
    @IsNotEmpty()
    codigoUnico: string;

    @IsNotEmpty()
    usuario: UsuarioDto;

    @IsInt()
    @IsNotEmpty()
    parcela: CreateParcelaDto;
}