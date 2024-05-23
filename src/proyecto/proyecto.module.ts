/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto';
import { ProyectoController } from './proyecto.controller';
import { ProyectoService } from './proyecto.service';


@Module({
  providers: [ProyectoService],
  controllers: [ProyectoController],
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
})
export class ProyectoModule {}
