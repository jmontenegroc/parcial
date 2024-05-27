/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante';
import { PropuestaEntity } from '../propuesta/propuesta';
import { ProfesorEntity } from './profesor';
import { ProfesorService } from './profesor.service';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repo: Repository<ProfesorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(ProfesorEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repo = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
  });
  it('should find a profesor by id', async () => {
    const profesor = new ProfesorEntity();
    profesor.id = faker.datatype.uuid();
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(profesor);
  
    expect(await service.findProfesorById(profesor.id)).toEqual(profesor);
  });
  
  it('should throw an error if profesor with given id does not exist', async () => {
    const id = faker.datatype.uuid();
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
  
    await expect(service.findProfesorById(id)).rejects.toThrow('The profesor with the given id was not found');
  });
  
  it('should create a profesor', async () => {
    const profesor = new ProfesorEntity();
    profesor.grupoInvestigacion = 'TICSW';
    jest.spyOn(repo, 'save').mockResolvedValueOnce(profesor);
  
    expect(await service.crearProfesor(profesor)).toEqual(profesor);
  });
  
  it('should throw an error if profesor grupoInvestigacion is not valid', async () => {
    const profesor = new ProfesorEntity();
    profesor.grupoInvestigacion = 'INVALID';
  
    await expect(service.crearProfesor(profesor)).rejects.toThrow('Invalid grupoInvestigacion');
  });

  it('should delete a profesor by cedula', async () => {
    const profesor = new ProfesorEntity();
    profesor.cedula = faker.datatype.number();
    profesor.propuestas = [];
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(profesor);
    jest.spyOn(repo, 'remove').mockResolvedValueOnce(profesor);
  
    expect(await service.eliminarProfesorByCedula(profesor.cedula)).toEqual(profesor);
  });

  it('should throw an error if profesor with given cedula has propuestas with a project', async () => {
    const profesor = new ProfesorEntity();
    profesor.cedula = faker.datatype.number();
    profesor.propuestas = [{
        proyecto: {
            id: faker.datatype.uuid(),
            fechaInicio: faker.date.past(),
            fechaFin: faker.date.future(),
            url: faker.internet.url(),
            estudiante: new EstudianteEntity,
            propuesta: new PropuestaEntity
        },
        id: faker.datatype.uuid(),
        titulo: faker.lorem.words(),
        descripcion: faker.lorem.paragraph(),
        palabraClaves: faker.lorem.words(),
        profesor: new ProfesorEntity
    }];
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(profesor);

    await expect(service.eliminarProfesorByCedula(profesor.cedula)).rejects.toThrow();
  });
});