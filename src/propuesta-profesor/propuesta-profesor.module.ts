/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from 'src/profesor/profesor';
import { PropuestaEntity } from 'src/propuesta/propuesta';
import { PropuestaProfesorService } from './propuesta-profesor.service';


@Module({
    imports: [TypeOrmModule.forFeature([PropuestaEntity, ProfesorEntity])],
    providers: [PropuestaProfesorService],
})
export class PropuestaProfesorModule 
{}
