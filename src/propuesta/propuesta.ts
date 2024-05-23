/* eslint-disable prettier/prettier */
import { ProfesorEntity } from 'src/profesor/profesor';
import { ProyectoEntity } from 'src/proyecto/proyecto';
import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PropuestaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;
  @Column()
  descripcion: string;

  @Column()
  palabraClaves: string;

  @OneToOne(() => ProyectoEntity, (proyecto) => proyecto.estudiante)
  proyecto: ProyectoEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.propuestas)
  profesor: ProfesorEntity;
}
