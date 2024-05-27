/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto';
import { ProyectoService } from './proyecto.service';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repo: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(ProyectoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repo = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should create a proyecto', async () => {
    const proyecto = new ProyectoEntity();
    proyecto.fechaInicio = faker.date.past();
    proyecto.fechaFin = faker.date.future();
    jest.spyOn(repo, 'save').mockResolvedValueOnce(proyecto);

    expect(await service.crearProyecto(proyecto)).toEqual(proyecto);
  });

  it('should throw an error if proyecto has an invalid end date', async () => {
    const proyecto = new ProyectoEntity();
    proyecto.fechaInicio = faker.date.future();
    proyecto.fechaFin = faker.date.past();
    
    await expect(service.crearProyecto(proyecto)).rejects.toThrow();
  });
});