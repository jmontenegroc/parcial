/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EstudianteEntity } from './estudiante';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get(':id')
  async findEstudianteById(@Param('id') id: string) {
    return this.estudianteService.findEstudianteById(id);
  }

  @Post()
  async crearEstudiante(@Body() estudianteDto: EstudianteDto) {
    const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
    return this.estudianteService.crearEstudiante(estudiante);
  }
}