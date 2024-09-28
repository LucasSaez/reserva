import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { JwtMiddleware } from './usuarios/auth/middleware/jwt/jwt.middleware';
import { db } from './config/database-config';
import { CommonModule } from './common/common.module';
import { SocketModule } from './socket/socket.module';
import { ReservasModule } from './sistema-reserva/reservas/reservas.module';
import { ParcelasModule } from './sistema-reserva/parcelas/parcelas.module';
import { DepartamentosModule } from './sistema-reserva/departamentos/departamentos.module';
import { IngresosModule } from './sistema-reserva/ingresos/ingresos.module';
import { SistemaReservaModule } from './sistema-reserva/sistema-reserva.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(db),
    UsuariosModule,
    CommonModule,
    SocketModule,
    ReservasModule,
    ParcelasModule,
    DepartamentosModule,
    IngresosModule,
    SistemaReservaModule,
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  //rutas protegidas usando el token
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude(
      {
        path: '/usuarios/auth/register',
        method: RequestMethod.POST
      },
      {
        path: '/usuarios/auth/login',
        method: RequestMethod.POST
      },
      {
        path: '/usuarios/all',
        method: RequestMethod.GET
      },
      {
        path: '/usuarios/:id',
        method:RequestMethod.GET
      },
      {
        path: '/departamentos/new-depto',
        method: RequestMethod.POST
      },
      {
        path: '/departamentos/:id/update',
        method:RequestMethod.PATCH
      },
      {
        path: '/reservas/new-reserva',
        method: RequestMethod.POST
      },
      {
        path: '/reservas/:id/update-reserva',
        method: RequestMethod.POST
      },
      {
        path: '/reservas/:id/change-estado',
        method: RequestMethod.PATCH
      }
    ).forRoutes('');
  }
}