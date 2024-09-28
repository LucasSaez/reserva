import { Module } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { IngresosController } from './ingresos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoEntity } from './entities/ingreso.entity';
import { Usuarios } from 'src/usuarios/entity/usuarios.entity';
import { ParcelaEntity } from '../parcelas/entities/parcela.entity';
import { ParcelasService } from '../parcelas/parcelas.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([IngresoEntity,Usuarios,ParcelaEntity]),
   
  ],
  controllers: [IngresosController],
  providers: [IngresosService,ParcelasService],
  
})
export class IngresosModule {}