/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta';

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(PropuestaEntity)
    private readonly propuestaRepository: Repository<PropuestaEntity>,
  ) {}

  async findAllPropuesta(): Promise<PropuestaEntity[]> {
    return await this.propuestaRepository.find({
      relations: ['profesor', 'proyecto'],
    });
  }

  async findPropuestaById(id: string): Promise<PropuestaEntity> {
    const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({
      where: { id },
      relations: ['profesor', 'proyecto'],
    });
    if (!propuesta)
      throw new Error(
        'The propuesta with the given id was not found',
      );

    return propuesta;
  }

  async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    if (!propuesta.titulo) {
      throw new Error('The propuesta has an invalid title');
    }
    return await this.propuestaRepository.save(propuesta);
  }

  async deletePropuesta(id: string) {
    const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({
      where: { id },
    });
    if (!propuesta)
      throw new Error(
        'The propuesta with the given id was not found'
      );

    if (propuesta.proyecto)
      throw new Error(
        'The propuesta cannot be deleted'      );

    await this.propuestaRepository.remove(propuesta);
  }
}
