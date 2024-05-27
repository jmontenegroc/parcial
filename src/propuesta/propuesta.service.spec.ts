/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto';
import { PropuestaEntity } from './propuesta';
import { PropuestaService } from './propuesta.service';


describe('PropuestaService', () => {
  let service: PropuestaService;
  let repo: Repository<PropuestaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropuestaService,
        {
          provide: getRepositoryToken(PropuestaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repo = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
  });

  it('should find all propuestas', async () => {
    const propuestas = [new PropuestaEntity(), new PropuestaEntity()];
    jest.spyOn(repo, 'find').mockResolvedValueOnce(propuestas);

    expect(await service.findAllPropuesta()).toEqual(propuestas);
  });

  it('should find a propuesta by id', async () => {
    const propuesta = new PropuestaEntity();
    propuesta.id = '123';
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(propuesta);

    expect(await service.findPropuestaById('123')).toEqual(propuesta);
  });

  it('should throw an error if propuesta not found', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

    await expect(service.findPropuestaById('123')).rejects.toThrow();
  });

  it('should create a propuesta', async () => {
    const propuesta = new PropuestaEntity();
    propuesta.titulo = 'Test Propuesta';
    jest.spyOn(repo, 'save').mockResolvedValueOnce(propuesta);

    expect(await service.crearPropuesta(propuesta)).toEqual(propuesta);
  });

  it('should throw an error if propuesta title is empty', async () => {
    const propuesta = new PropuestaEntity();
    propuesta.titulo = '';

    await expect(service.crearPropuesta(propuesta)).rejects.toThrow();
  });
  it('should delete a propuesta', async () => {
    const propuesta = new PropuestaEntity();
    propuesta.id = faker.datatype.uuid();
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(propuesta);
    jest.spyOn(repo, 'remove').mockResolvedValueOnce(propuesta);
  
    await service.deletePropuesta(propuesta.id);
    expect(repo.remove).toHaveBeenCalledWith(propuesta);
  });
  
  it('should throw an error if propuesta with given id does not exist', async () => {
    const id = faker.datatype.uuid();
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
  
    await expect(service.deletePropuesta(id)).rejects.toThrow('The propuesta with the given id was not found');
  });
  
  it('should throw an error if propuesta has a proyecto', async () => {
    const propuesta = new PropuestaEntity();
    propuesta.id = faker.datatype.uuid();
    propuesta.proyecto = new ProyectoEntity();
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(propuesta);
  
    await expect(service.deletePropuesta(propuesta.id)).rejects.toThrow('The propuesta cannot be deleted');
  });
});