import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Response } from 'express';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post('new-depto')
  async register(
    @Body() deptoDto: CreateDepartamentoDto,
    @Res() res: Response
  ){
    const result = await this.departamentosService.registrarDepartamento(deptoDto);
    res.status(HttpStatus.CREATED).json({result, msg: 'creado on exito'});
  }


  @Patch(':id/update')
  async update(
    @Param('id') id: number,
    @Body() updateDeptoDto: UpdateDepartamentoDto,
    @Res() response:Response
  ){
    const result = await this.departamentosService.editarDepartamento(id, updateDeptoDto);
    response.status(HttpStatus.OK).json({result, msg: 'actualizado con exito'});
  }
 
}