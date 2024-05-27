/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfesorEntity } from '../profesor/profesor';
import { ProyectoEntity } from '../proyecto/proyecto';

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

  @OneToOne(() => ProyectoEntity, (proyecto) => proyecto.propuesta)
  proyecto: ProyectoEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.propuestas)
  profesor: ProfesorEntity;
}
