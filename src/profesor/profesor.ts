/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PropuestaEntity } from '../propuesta/propuesta';

@Entity()
export class ProfesorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cedula: number;
  @Column()
  nombre: string;
  @Column()
  grupoInvestigacion: string;
  @Column()
  numeroExtension: number;

  @OneToMany(() => PropuestaEntity, (propuesta) => propuesta.profesor)
  propuestas: PropuestaEntity[];
}
