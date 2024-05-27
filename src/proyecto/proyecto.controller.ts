/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProyectoEntity } from './proyecto';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { ProyectoService } from './proyecto.service';

@Controller('proyecto')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    async crearProyecto(@Body() proyectoDto: ProyectoDto) {
      const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDto);
      return this.proyectoService.crearProyecto(proyecto);
    }
}
