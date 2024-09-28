import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentoEntity } from './entities/departamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentosService {
 
  constructor(
    @InjectRepository(DepartamentoEntity) private readonly departamentoRepository: Repository<CreateDepartamentoDto>
  ){}


  async registrarDepartamento(departamentoDto: CreateDepartamentoDto){

    try {

      const departamento = await this.departamentoRepository.save(departamentoDto);

      return departamento;
      
    } catch (error) {
      console.error(error);
      throw new BadRequestException(HttpStatus.BAD_REQUEST, 'error a la hora de crear un departamento')
    }

  }

  async editarDepartamento(id:number,updateDeptoDto: UpdateDepartamentoDto){

    try {

      const idDepto = await this.departamentoRepository.findOne({
        where: {id: id}
      });

      if(!idDepto){
        throw new BadRequestException('no existe departamento con ese id')
      };

      const updateDepto = await this.departamentoRepository.update(idDepto, updateDeptoDto);
      
      return updateDepto;

    } catch (error) {
      console.error(error);
      throw new HttpException('error en actualizar', HttpStatus.BAD_REQUEST)
    }

  } 


}