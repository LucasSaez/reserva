import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe, Headers } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Response } from 'express';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}


  @Post('/new-reserva')
  async createReserva(
    @Body('usuarioId') usuarioId: number,
    @Body('deptoId') deptoId: number,
    @Body('fechaSalida') fechaSalida: Date,
    @Res() response: Response
  ){
    const result = await this.reservasService.registerReserva(usuarioId,deptoId,fechaSalida);
    response.status(HttpStatus.CREATED).json({result,msg:'creado con exito'})
  }

  @Post(':id/update-reserva')
  async compareReserva(
    @Body() reservaDto: Partial<CreateReservaDto>,
    @Param('id') id:number,
    @Res() response: Response
  ){
    const result = await this.reservasService.compareStatusReserva(id, reservaDto);
    response.status(HttpStatus.CREATED).json({result,msg:'creado con exito'})
  }


  @Patch(':id/change-estado')
  async changeEstado(
    @Param('id',ParseIntPipe) id: string,
    @Headers('Authorization') authorization: string,
    @Body() estado: Partial<CreateReservaDto>
  ){

    try {
      const result = await this.reservasService.updateStatusReserva(+id,authorization,estado)
      return result;
    } catch (error) {
      console.log(error)
      return null;
    }
   
  }
}