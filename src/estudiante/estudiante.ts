/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto';

@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  codigo: string;
  @Column()
  creditosAprobados: number;
  @Column()
  nombre: string;

  @OneToOne(() => ProyectoEntity, (proyecto) => proyecto.estudiante)
  @JoinColumn()
  proyecto: ProyectoEntity;
}
