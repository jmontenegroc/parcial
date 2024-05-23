/* eslint-disable prettier/prettier */
import { ProyectoEntity } from 'src/proyecto/proyecto';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

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
