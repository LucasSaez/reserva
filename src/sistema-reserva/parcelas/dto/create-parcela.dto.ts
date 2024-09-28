import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ParcelaStatusList } from "../enum/parcelas-enum";
import { ParcelaStatus } from "../entities/parcela.entity";

export class CreateParcelaDto {

    id:number;

    @IsNumber()
    @IsUUID(4)
    @IsOptional()
    codigoUnico: number;


    @IsString()
    @IsNotEmpty({
        message: 'coloca un nombre'
    })
    nombreParcela: string;

    @IsEnum(
        ParcelaStatusList,{
            message: `posible estados como ${ParcelaStatusList}`
        }
    )
    @IsOptional()
    estado: ParcelaStatus = ParcelaStatus.PENDIENTE;


}