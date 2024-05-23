/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';

@Module({
  providers: [ProfesorService],
  controllers: [ProfesorController],
  imports: [TypeOrmModule.forFeature([ProfesorEntity])],

})
export class ProfesorModule {}
