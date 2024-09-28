import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CreateDepartamentoDto } from "src/sistema-reserva/departamentos/dto/create-departamento.dto";
import { ParcelaStatus } from "src/sistema-reserva/parcelas/entities/parcela.entity";
import { ParcelaStatusList } from "src/sistema-reserva/parcelas/enum/parcelas-enum";
import { UsuarioDto } from "src/usuarios/dto/usuarios.dto";

export class CreateReservaDto {

    id: number;
    
    @IsDateString({
        strict: false
    })
    fechaEntrada: Date;

    
    @IsNotEmpty({
        message: 'ingrese una fecha de salida'
    })
    @IsDate()
    fechaSalida: Date;

    @IsEnum(
        ParcelaStatusList,{
            message: `posible estados como ${ParcelaStatusList}`
        }
    )
    @IsOptional()
    estado: ParcelaStatus = ParcelaStatus.PENDIENTE;

    @IsNotEmpty()
    usuario: UsuarioDto;

    @IsNotEmpty()
    departamento: CreateDepartamentoDto


}