/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';

@Module({
  providers: [EstudianteService],
  controllers: [EstudianteController],
  imports: [TypeOrmModule.forFeature([EstudianteEntity])],

})
export class EstudianteModule {}
