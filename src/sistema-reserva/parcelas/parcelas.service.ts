import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParcelaEntity, ParcelaStatus } from './entities/parcela.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/entity/usuarios.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ParcelasService {

  constructor(
    @InjectRepository(ParcelaEntity) private readonly parcela: Repository<ParcelaEntity>,
    @InjectRepository(Usuarios) private readonly usuario: Repository<Usuarios>
  ) { }


  //*funcion para registrar una parcela
  async registerParcela(ParcelaDto: CreateParcelaDto) {

    try {
      // const usuario = await this.usuario.findOne({
      //   where: {id: id}
      // })

      // if(!usuario){
      //   console.log('no existe cliente')
      // }


      const parcela = this.parcela.create(ParcelaDto);
      await this.parcela.save(parcela);
      return parcela;


    } catch (error) {
      console.log(error)
      throw new NotFoundException(`error a la hora de crear ${this.parcela}`)

    }
  }



  //*funcion que trae todas las parcelas
  async getAllParcelas(paginationDto: PaginationDto) {

    const { limit = 5, offset = 0 } = paginationDto;

    try {

      const parcelas = await this.parcela.find({
        take: limit,
        skip: offset
      });

      return parcelas;


    } catch (error) {
      console.log(error);
      throw new BadRequestException('no se pudo mostrar todas las parcelas')
    }
  }


  //*funcion que trae una parcela por su id
  async getOneParcela(id: number) {


    try {

      const parcela_id = await this.parcela.findOne({
        where: { id }
      });

      if (!parcela_id) throw new NotFoundException(`parcela con id no encontrada`);

      return parcela_id;


    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }


  //*update setea el valor ocupada a true
  async updateParcela(id: number) {

    try {
      const parcelaId = await this.parcela.findOne({ where: { id } });
      if (!parcelaId) throw new NotFoundException('no encontramos ninguna parcela con ese id')
      await this.parcela.update(parcelaId, { estado: ParcelaStatus.OCUPADA });
      return parcelaId;


    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${ err.name } ${ err.driverError }`, 404);
      throw new HttpException(err.message, err.status);
    }
  }

  async marcaSalidaParcela(id:number){
    try {
      const parcelaId = await this.parcela.findOne({
        where: {id}
      });
      if(!parcelaId){
        throw new NotFoundException('no encontramos parcela con ese id')
      };
      return await this.parcela.update(parcelaId, {estado: ParcelaStatus.LIBRE})
      
    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${ err.name } ${ err.driverError }`, 404);
      throw new HttpException(err.message, err.status);
    }
  }




}