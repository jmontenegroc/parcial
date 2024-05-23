/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    BusinessError,
    BusinessLogicException,
} from 'src/shared/errors/business-errors';
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
      throw new BusinessLogicException(
        'The profesor with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return profesor;
  }

  async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    const grupos = ['TICSW', 'IMAGINE', 'COMIT'];
    if (profesor.grupoInvestigacion in grupos)
      throw new BusinessLogicException(
        'The profesor has not an existing group',
        BusinessError.NOT_FOUND,
      );
    return await this.profesorRepository.save(profesor);
  }

  async eliminarProfesor(id: string) {
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({
      where: { id },
    });
    if (!profesor)
      throw new BusinessLogicException(
        'The profesor with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    const propuestas = profesor.propuestas;
    for (let i = 0; i < propuestas.length; i++) {
      if (propuestas[i].proyecto)
        throw new BusinessLogicException(
          'The profesor has propuestas with a project',
          BusinessError.PRECONDITION_FAILED,
        );
    }

    await this.profesorRepository.remove(profesor);
  }
  async eliminarProfesorByCedula(cedula: number) {
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({
      where: { cedula },
    });
    if (!profesor)
      throw new BusinessLogicException(
        'The profesor with the given cedula was not found',
        BusinessError.NOT_FOUND,
      );
    const propuestas = profesor.propuestas;
    for (let i = 0; i < propuestas.length; i++) {
      if (propuestas[i].proyecto)
        throw new BusinessLogicException(
          'The profesor has propuestas with a project',
          BusinessError.PRECONDITION_FAILED,
        );
    }

    await this.profesorRepository.remove(profesor);
  }
}
