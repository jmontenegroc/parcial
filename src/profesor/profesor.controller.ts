/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProfesorEntity } from './profesor';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { ProfesorService } from './profesor.service';


@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get(':id')
  async findProfesorById(@Param('id') id: string) {
    return this.profesorService.findProfesorById(id);
  }

  @Post()
  async crearProfesor(@Body() profesorDto: ProfesorDto) {
    const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
    return await this.profesorService.crearProfesor(profesor);
  }


  @Delete(':id')
  async eliminarProfesor(@Param('id') id: string) {
    return this.profesorService.eliminarProfesor(id);
  }

  @Delete('cedula/:cedula')
  async eliminarProfesorByCedula(@Param('cedula') cedula: number) {
    return this.profesorService.eliminarProfesorByCedula(cedula);
  }
}