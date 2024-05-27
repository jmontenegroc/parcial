/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante';
import { PropuestaEntity } from '../propuesta/propuesta';

@Entity()
export class ProyectoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fechaInicio: Date;
  @Column()
  fechaFin: Date;
  @Column()
  url: string;

  @OneToOne(() => EstudianteEntity, (estudiante) => estudiante.proyecto)
  estudiante: EstudianteEntity;
  @OneToOne(() => PropuestaEntity, (propuesta) => propuesta.proyecto)
  @JoinColumn()
  propuesta: PropuestaEntity;
}