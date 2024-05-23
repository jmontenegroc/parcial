/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    BusinessError,
    BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async findEstudianteById(id: string): Promise<EstudianteEntity> {
    const estudiante: EstudianteEntity =
      await this.estudianteRepository.findOne({
        where: { id },
        relations: ['artworks', 'exhibitions'],
      });
    if (!estudiante)
      throw new BusinessLogicException(
        'The estudiante with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return estudiante;
  }

  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    if (estudiante.codigo.length != 10)
      throw new BusinessLogicException(
        'The estudiante has not a valid codigo',
        BusinessError.NOT_FOUND,
      );
    return await this.estudianteRepository.save(estudiante);
  }
}
