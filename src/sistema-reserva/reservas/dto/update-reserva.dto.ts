import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';
import { CreateDepartamentoDto } from 'src/sistema-reserva/departamentos/dto/create-departamento.dto';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';
import { ParcelaStatus } from 'src/sistema-reserva/parcelas/entities/parcela.entity';
import { IsEnum } from 'class-validator';
import { ParcelaStatusList } from 'src/sistema-reserva/parcelas/enum/parcelas-enum';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
  
    @IsEnum(
        ParcelaStatusList,{
            message: `solo estados como ${ParcelaStatus.APROBADA} o ${ParcelaStatus.DESAPROBADA} o ${ParcelaStatus.PENDIENTE}`
        }
    )
    estado: ParcelaStatus;
}