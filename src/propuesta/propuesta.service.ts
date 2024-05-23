/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    BusinessError,
    BusinessLogicException,
} from "src/shared/errors/business-errors";
import { Repository } from "typeorm";
import { PropuestaEntity } from "./propuesta";

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(PropuestaEntity)
    private readonly propuestaRepository: Repository<PropuestaEntity>
  ) {}

  async findAllPropuesta(): Promise<PropuestaEntity[]> {
    return await this.propuestaRepository.find({
      relations: ["profesor", "proyecto"],
    });
  }

  async findPropuestaById(id: string): Promise<PropuestaEntity> {
    const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({
      where: { id },
      relations: ["artworks", "exhibitions"],
    });
    if (!propuesta)
      throw new BusinessLogicException(
        "The propuesta with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return propuesta;
  }

  async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    if (propuesta.titulo == '')
        throw new BusinessLogicException(
          "The propuesta with the given id was not found",
          BusinessError.PRECONDITION_FAILED
        );
    return await this.propuestaRepository.save(propuesta);
  }


  async deletePropuesta(id: string) {
    const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({
      where: { id },
    });
    if (!propuesta)
      throw new BusinessLogicException(
        "The propuesta with the given id was not found",
        BusinessError.NOT_FOUND
      );

      if (propuesta.proyecto)
        throw new BusinessLogicException(
          "The propuesta cannot be deleted",
          BusinessError.PRECONDITION_FAILED
        );

    await this.propuestaRepository.remove(propuesta);
  }
}
