import { IsEnum, IsUUID } from "class-validator";
import { ParcelaStatus } from "../entities/parcela.entity";
import { ParcelaStatusList } from "../enum/parcelas-enum";
import { PartialType } from "@nestjs/mapped-types";
import { UpdateParcelaDto } from "./update-parcela.dto";


export class ChangeParcelaStatusDto extends PartialType(UpdateParcelaDto){
    
    id: number;

    @IsEnum(
        ParcelaStatusList,{
            message: `estados validos como ${ParcelaStatusList}`
        }
    )
    estado: ParcelaStatus;

    @IsUUID(4)
    codigoUnico?: number;
}