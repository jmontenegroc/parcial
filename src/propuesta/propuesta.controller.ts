/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PropuestaEntity } from './propuesta';
import { PropuestaDto } from './propuesta.dto/propuesta.dto';
import { PropuestaService } from './propuesta.service';


@Controller('propuesta')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Get()
  async findAllPropuesta() {
    return this.propuestaService.findAllPropuesta();
  }

  @Get(':id')
  async findPropuestaById(@Param('id') id: string) {
    return this.propuestaService.findPropuestaById(id);
  }

  @Post()
  async crearPropuesta(@Body() propuestaDto: PropuestaDto) {
    const propuesta: PropuestaEntity = plainToInstance(PropuestaEntity, propuestaDto);
    return this.propuestaService.crearPropuesta(propuesta);
  }

  @Delete(':id')
  async deletePropuesta(@Param('id') id: string) {
    return this.propuestaService.deletePropuesta(id);
  }
}