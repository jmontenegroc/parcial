/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async findEstudianteById(id: string): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRepository.findOne({where: {id}});
  
    if (!estudiante) {
      throw new Error('Estudiante no encontrado');
    }
  
    return estudiante;
  }

  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    if (estudiante.codigo.length != 10)
      throw new Error(
        'El código del estudiante debe tener 10 caracteres',
      );
    return await this.estudianteRepository.save(estudiante);
  }
}
