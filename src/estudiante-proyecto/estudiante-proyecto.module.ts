/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante';
import { ProyectoEntity } from 'src/proyecto/proyecto';
import { EstudianteProyectoService } from './estudiante-proyecto.service';

@Module({
  providers: [EstudianteProyectoService],
  imports: [TypeOrmModule.forFeature([EstudianteEntity, ProyectoEntity])],

})
export class EstudianteProyectoModule {}
