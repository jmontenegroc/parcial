/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
  ) {}

  async findProfesorById(id: string): Promise<ProfesorEntity> {
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({
      where: { id },
      relations: ['propuestas'],
    });
    if (!profesor)
      throw new Error(
        'The profesor with the given id was not found',
      );

    return profesor;
  }

  async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    const grupos = ['TICSW', 'IMAGINE', 'COMIT'];
    if (!grupos.includes(profesor.grupoInvestigacion))
      throw new Error(
        'Invalid grupoInvestigacion',
      );
    return await this.profesorRepository.save(profesor);
  }

  async eliminarProfesor(id: string) {
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({
      where: { id },
      relations: ['propuestas'],
    });
    if (!profesor)
      throw new Error(
        'The profesor with the given id was not found',
      );
    const propuestas = profesor.propuestas;
    for (let i = 0; i < propuestas.length; i++) {
      if (propuestas[i].proyecto)
        throw new Error(
          'The profesor has propuestas with a project',
        );
    }

    await this.profesorRepository.remove(profesor);
  }
async eliminarProfesorByCedula(cedula: number): Promise<ProfesorEntity> {
  const profesor = await this.profesorRepository.findOne({ 
    where: {cedula} });
  
  if (!profesor) {
    throw new Error('Profesor no encontrado');
  }

  if (profesor.propuestas.some(propuesta => propuesta.proyecto)) {
    throw new Error('No se puede eliminar un profesor con propuestas que tienen un proyecto');
  }

  return this.profesorRepository.remove(profesor);
}
}
