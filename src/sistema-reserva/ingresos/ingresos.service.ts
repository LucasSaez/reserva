import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IngresoEntity } from './entities/ingreso.entity';
import { Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/entity/usuarios.entity';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';
import { ParcelaEntity, ParcelaStatus } from '../parcelas/entities/parcela.entity';
import { CreateParcelaDto } from '../parcelas/dto/create-parcela.dto';
import { ParcelasService } from '../parcelas/parcelas.service';

@Injectable()
export class IngresosService {

  constructor(
    @InjectRepository(ParcelaEntity) private readonly parcelaDto: Repository<CreateParcelaDto>,
    @InjectRepository(IngresoEntity) private readonly ingresoDto: Repository<CreateIngresoDto>,
    @InjectRepository(Usuarios) private readonly usuarioDto: Repository<UsuarioDto>,
    private readonly parcelaService: ParcelasService
  ) { }

  async registerIngreso(usuarioId:number, parcelaId:number,codUnico:string):Promise<CreateIngresoDto> {
    
    try {

      const usuarioCodUnico = await this.usuarioDto.findOne({
        where: {codigoUnico: codUnico}
      });
      if(!usuarioCodUnico) {
        console.log('ingrese un codigo valido')
        throw new BadRequestException('ingrese un codigo valido')
      }


      const usuario = await this.usuarioDto.findOne({
        where: {id: usuarioId}
      })
      if(!usuario){
        throw new NotFoundException('usuario no encontrado')
      }
      

      const parcela = await this.parcelaDto.findOne({
        where: {id: parcelaId}
      })
      if(!parcela){
        throw new BadRequestException('parcela no encontrada');

      }

      if(parcela.estado === ParcelaStatus.OCUPADA){
        throw new BadRequestException('parcela ocupada')
      }


      const ingreso = this.ingresoDto.create({
        usuario, parcela, entrada: new Date(), salida:null
      });

      if(ingreso){
        this.parcelaService.updateParcela(parcelaId);
      }

      

      const result = this.ingresoDto.save(ingreso);
      return result;

    
      // const usuarioFound = await this.usuario.find({
      //   where: { id: usuario.id }
      // })

      // if (!usuarioFound) {
      //   return new BadRequestException(`no se puede registrar usuario con mail ${parcela.id}`)
      // }

      // const parcelaFound = await this.parcelaDto.find({
      //   where: { id: parcela.id },
      //   // select: {id: true}
      // })

      // if (!parcelaFound) {
      //   throw new BadRequestException(`no se puede registrar la parcela con id ${parcela.id}`)
      // }

      // const parcelaFound = await this.parcelaRepository.findOneBy({
      //   id: parcela.id,
      // });
      // if (!parcelaFound) throw new NotFoundException(`Parcela no encontrada ${parcelaFound}`);
      // // if (parcelaFound.estado === 'PENDIENTE') throw new NotFoundException(`Parcela ${parcelaFound.id} ocupada`);

      // const usuarioFound = await this.usuarioRepository.findOne({ where: { id: usuario.id } });
      // if (!usuarioFound) throw new NotFoundException('Usuario no encontrado');



      // const parcelaEstado = parcela.estado;
      // if(parcelaEstado === 'PENDIENTE'){
      //   await this.ingreso.save(ingresoDto);
      // }

      

    


    } catch (error) {
      console.log(error);
      throw new BadRequestException('error a la hora de registrar')
    }

  }


  async registrarSalida(parcelaId: number,usuarioId:number, ingresoId:number){


    try {

      // const ingresoFound = await this.ingresoDto.findOne({
      //   where:{id: ingresoId}
      // });
      // if(!ingresoFound){
      //   throw new NotFoundException('no hay registros del id de ese ingreso')
      // }
  
      //* consultamos si la parcela id que le pasamos por el body, coincide con la que esta almacenada en la base de datos
      const parcelaFound = await this.parcelaDto.findOne({
        where: {id: parcelaId}
      });
      if(!parcelaFound){
        throw new NotFoundException('parcela no encontrada');
      }
      if(!parcelaFound.estado){
        throw new NotFoundException('parcela esta ocupada')
      }
  
  
      //*buscamos si existe el usuario que le pasamos por body, y en el que esta en la db
      const usuarioFound = await this.usuarioDto.findOne({
        where: {id: usuarioId}
      });
      if(!usuarioFound){
        throw new NotFoundException('usuario no encontrado')
      };

      //*consultamos si existe el ingreso con el id por parametro
      const ingresoUsuarioId = await this.ingresoDto.findOne({
        where:{id: ingresoId},
        relations: ['usuario']
      });
      if(!ingresoUsuarioId){
        throw new NotFoundException('no hay registros del id de ese ingreso')
      }
      

      // const salidaUsuario = await this.ingresoDto.delete(ingresoUsuarioId.usuario.id);

      if(ingresoUsuarioId.usuario.id === usuarioId){
        await this.parcelaService.marcaSalidaParcela(parcelaId);
        // salidaUsuario.affected = 1
        return await this.ingresoDto.update(ingresoId, {
          salida: new Date() 
        })
       
      };

     
  
      

     

      // if(usuarioFound.id === usuarioId){
      //   ingresoFound.usuario.isActive = false;
      //   const salidaUsuario = await this.ingresoDto.softRemove(usuarioIdIngreso);
      // }
   
      
  
     
      //actualizamos la salida con la fecha actual
      // const result = await this.ingresoDto.update(parcelaFound, {
      //   salida: new Date() 
      // }) 
      
    } catch (error) {
      console.log(error);
      throw new BadRequestException('error a la hora de registrar')
    }

   

   
    
  }


}