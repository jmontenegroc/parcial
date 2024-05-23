/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteProyectoModule } from './estudiante-proyecto/estudiante-proyecto.module';
import { EstudianteEntity } from './estudiante/estudiante';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorEntity } from './profesor/profesor';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaProfesorModule } from './propuesta-profesor/propuesta-profesor.module';
import { PropuestaEntity } from './propuesta/propuesta';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoPropuestaModule } from './proyecto-propuesta/proyecto-propuesta.module';
import { ProyectoEntity } from './proyecto/proyecto';
import { ProyectoModule } from './proyecto/proyecto.module';

@Module({
  imports: [
    ProyectoModule,
    ProfesorModule,
    PropuestaModule,
    EstudianteModule,
    EstudianteProyectoModule,
    ProyectoPropuestaModule,
    PropuestaProfesorModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "parcial",
      entities: [
        ProyectoEntity,
        ProfesorEntity,
        PropuestaEntity,
        EstudianteEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
