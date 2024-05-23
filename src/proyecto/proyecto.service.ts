/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    BusinessError,
    BusinessLogicException,
} from "src/shared/errors/business-errors";
import { Repository } from "typeorm";
import { ProyectoEntity } from "./proyecto";

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>
  ) {}

  async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    if(proyecto.fechaFin < proyecto.fechaInicio){
        throw new BusinessLogicException(
            "The project has an invalid end date",
            BusinessError.PRECONDITION_FAILED
        );
    }
    return await this.proyectoRepository.save(proyecto);
  }

}
