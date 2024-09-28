import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentoEntity } from '../departamentos/entities/departamento.entity';
import { Repository } from 'typeorm';
import { ReservaEntity, ReservaStatus } from './entities/reserva.entity';
import { RoleStatus, Usuarios } from 'src/usuarios/entity/usuarios.entity';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';
import { ParcelaStatus } from '../parcelas/entities/parcela.entity';
import { AuthService } from 'src/usuarios/auth/auth.service';

@Injectable()
export class ReservasService {

  constructor(
    @InjectRepository(DepartamentoEntity) private readonly departamentoRepository: Repository<CreateReservaDto>,
    @InjectRepository(ReservaEntity) private readonly reservaRepository: Repository<CreateReservaDto>,
    @InjectRepository(Usuarios) private readonly usuarioRepository: Repository<UsuarioDto>,
    private readonly authService: AuthService
  ){}


  async registerReserva(usuarioId:number, deptoId: number, fechaSalida: Date){

    

    try {

     

      const usuario = await this.usuarioRepository.findOne({
        where: {id: usuarioId}
      });
      if(!usuario){
        return new NotFoundException('usuario no encontrado')
      };

      const departamento = await this.departamentoRepository.findOne({
        where: {id: deptoId }
      });
      if(!departamento){
        return new NotFoundException('departamento no encontrado')
      };

      
     
      const reserva = this.reservaRepository.create({
        usuario, departamento, fechaEntrada: new Date(),fechaSalida
      });

      //*condicion que ingrese una salida
      if(fechaSalida === undefined || fechaSalida === null){
        return new BadRequestException('ingreseuna fecha de salida')
      };
      
      //*condicion de que no puede coincidir la fecha de entrada con la fecha de salida
      if(reserva.fechaEntrada === fechaSalida){
        return new BadRequestException('no podes marcar fecha de salida con la misma fecha de entrada')
      }

      //*comparamos si en el departamento esta en estado pendiente, si es asi, es porque hay alguien ocupandola
      if(reserva.estado === ParcelaStatus.PENDIENTE){
        return new BadRequestException('departamento se puede ocupar')
      };

      //*comparamos si el estado de la reserva esta aprobada, ahi ya no puede registrarse
      if(reserva.estado === ParcelaStatus.APROBADA){
        return new UnauthorizedException(`ya no se puede registrar por que tiene estado ${ReservaStatus.APROBADA}`)
      }


      const result = this.reservaRepository.save(reserva);
      return result;

      
    } catch (error) {
      console.log(error);
      throw new BadRequestException('error a la hora de registrar')
    }
  }


  async getReservaById(id: number){

    try {

      const reserva = await this.reservaRepository.findOne({
        where: {id}
      })
      if(!reserva){
        return new BadRequestException('no existe reserva con eseid')
      }
      
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }

  }


  async compareStatusReserva(id: number, reserva: Partial<CreateReservaDto>){


    try {

      const reservaId = await this.reservaRepository.findOne({
        where: {id}
      })
      if(!reservaId){
        return new BadRequestException('no existe reserva con eseid')
      }

      if(reservaId.estado === ParcelaStatus.APROBADA){
        return  new UnauthorizedException('reserva con estado APROBADA, no puede registrarse')
      }

      
    } catch (error) {
      console.log(error)
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      throw new HttpException('no trajo los datos necesarios', httpStatus)
    }

  }


  async updateStatusReserva(idReserva: number, token?: string, reservaEstatus?: Partial<CreateReservaDto>){

    try {

      //*verificamos el token que le pasamos por el header
      const decodedUser = await this.authService.verifyJwt(token);
      console.log(decodedUser)

      //*extraemos el role del usuario que tiene el token en el header
      const role = decodedUser.role;

      //*comparamos si es ADMIN para aprobar la reserva o no
      if(role === RoleStatus.USER){
        return new UnauthorizedException('no estas permitido para aprobar una reserva,por que no tenes un rol de ADMIN')
      }else{
        const reserva = await this.reservaRepository.findOne({
          where: {id:idReserva}
        });
  
        if(!reserva){
          return new BadRequestException('no existe una reserva con ese id')

        }

        // if(reservaEstatus.estado !== ParcelaStatus.APROBADA || ParcelaStatus.DESAPROBADA){
        //   return new UnauthorizedException('pone bien el estado')
        // }
        const update = await this.reservaRepository.update(reserva, reservaEstatus);


        if(!update) return;

        if(update) return {msg:` actualizado con exito a ${reservaEstatus.estado}!`};
      }
      
    } catch (error) {
      console.log(error);
      throw new BadRequestException('error a la hora de registrarse')
    }

  }


 
}