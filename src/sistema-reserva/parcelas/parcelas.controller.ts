import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Controller('parcelas')
export class ParcelasController {
  constructor(private readonly parcelasService: ParcelasService) {}



  @Post('/new-parcela')
  async create(
    // @Param('id',ParseIntPipe) id: number,
    @Body() parcelaDto: CreateParcelaDto
  ) {
    return await this.parcelasService.registerParcela(parcelaDto);
  }

  @Get('/all')
  async getAll(
    @Query() paginationDto: PaginationDto
  ){
    return this.parcelasService.getAllParcelas(paginationDto);
  }

  @Get(':id')
  async parcelaById(
    @Param('id',ParseIntPipe) id: string
  ){
    return this.parcelasService.getOneParcela(+id)
  }

  
}