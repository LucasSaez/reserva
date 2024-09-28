import { Module } from '@nestjs/common';
import { ReservasModule } from './reservas/reservas.module';
import { ParcelasModule } from './parcelas/parcelas.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { IngresosModule } from './ingresos/ingresos.module';

@Module({
  imports: [ReservasModule, ParcelasModule, DepartamentosModule, IngresosModule]
})
export class SistemaReservaModule {}