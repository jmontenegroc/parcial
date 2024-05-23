import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { EstudianteProyectoModule } from './estudiante-proyecto/estudiante-proyecto.module';

@Module({
  imports: [ProyectoModule, ProfesorModule, PropuestaModule, EstudianteModule, EstudianteProyectoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
