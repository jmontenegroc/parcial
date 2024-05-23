/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from 'src/propuesta/propuesta';
import { ProyectoEntity } from 'src/proyecto/proyecto';
import { ProyectoPropuestaService } from './proyecto-propuesta.service';


@Module({
    imports: [TypeOrmModule.forFeature([PropuestaEntity, ProyectoEntity])],
    providers: [ProyectoPropuestaService],

})
export class ProyectoPropuestaModule {}
