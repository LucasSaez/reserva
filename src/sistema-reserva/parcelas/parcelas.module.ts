import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelaEntity } from './entities/parcela.entity';
import { IngresoEntity } from '../ingresos/entities/ingreso.entity';
import { Usuarios } from 'src/usuarios/entity/usuarios.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ParcelaEntity,IngresoEntity, Usuarios])
  ],
  controllers: [ParcelasController],
  providers: [ParcelasService],
  
})
export class ParcelasModule {}