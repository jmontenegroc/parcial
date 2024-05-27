/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante';
import { EstudianteService } from './estudiante.service';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repo: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(EstudianteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repo = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  it('should find a estudiante by id', async () => {
    const estudiante = new EstudianteEntity();
    estudiante.id = faker.datatype.uuid();
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(estudiante);

    expect(await service.findEstudianteById(estudiante.id)).toEqual(estudiante);
  });

  it('should throw an error if estudiante with given id does not exist', async () => {
    const id = faker.datatype.uuid();
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

    await expect(service.findEstudianteById(id)).rejects.toThrow();
  });

  it('should create a estudiante', async () => {
    const estudiante = new EstudianteEntity();
    estudiante.id = faker.datatype.uuid();
    estudiante.codigo = faker.random.alphaNumeric(10);
    estudiante.creditosAprobados = faker.datatype.number(100);
    estudiante.nombre = faker.name.firstName();
    jest.spyOn(repo, 'save').mockResolvedValueOnce(estudiante);
  
    expect(await service.crearEstudiante(estudiante)).toEqual(estudiante);
  });
  
  it('should throw an error if estudiante codigo length is not 10', async () => {
    const estudiante = new EstudianteEntity();
    estudiante.id = faker.datatype.uuid();
    estudiante.codigo = faker.random.alphaNumeric(9);
    estudiante.creditosAprobados = faker.datatype.number(100);
    estudiante.nombre = faker.name.firstName();
  
    await expect(service.crearEstudiante(estudiante)).rejects.toThrow('El código del estudiante debe tener 10 caracteres');
  });
  

});